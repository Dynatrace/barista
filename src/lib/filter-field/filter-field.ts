import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
  EventEmitter,
  Output,
  NgZone,
  Input,
  AfterViewInit,
  SimpleChanges,
  ViewChildren,
  QueryList,
  OnChanges,
} from '@angular/core';
import { takeUntil, switchMap, take, debounceTime } from 'rxjs/operators';
import { ENTER, BACKSPACE, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { DtAutocomplete, DtAutocompleteSelectedEvent, DtAutocompleteTrigger } from '@dynatrace/angular-components/autocomplete';
import { readKeyCode, isDefined } from '@dynatrace/angular-components/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { DtFilterFieldTag } from './filter-field-tag/filter-field-tag';
import {
  DtFilterFieldDataSource,
} from './filter-field-data-source';
import {
  DtNodeDef,
  isDtAutocompleteDef,
  isDtFreeTextDef,
  isDtRangeDef,
  DtFilterFieldTagData,
  isDtOptionDef
} from './types';
import { filterAutocompleteDef, filterFreeTextDef, transformSourceToTagData, findDefForSourceObj, peekOptionId } from './filter-field-util';
import { DtFilterFieldRangeTrigger } from './filter-field-range/filter-field-range-trigger';
import { DtFilterFieldRangeSubmittedEvent } from './filter-field-range/filter-field-range';

// tslint:disable:no-any

export class DtFilterFieldChangeEvent {
  constructor(
    public source: DtFilterField,
    /** Filter data objects added */
    public added: any[],
    /** Filter data objects removed. */
    public removed: any[],
    /** Current state of filter data objects. */
    public filters: any[]
  ) { }
}

export const DT_FILTER_FIELD_TYPING_DEBOUNCE = 200;

@Component({
  moduleId: module.id,
  selector: 'dt-filter-field',
  exportAs: 'dtFilterField',
  templateUrl: 'filter-field.html',
  styleUrls: ['filter-field.scss'],
  host: {
    'class': 'dt-filter-field',
    '(click)': '_handleHostClick($event)',
  },
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtFilterField implements AfterViewInit, OnDestroy, OnChanges {

  /** Label for the filter field (e.g. "Filter by"). Will be placed next to the filter icon. */
  @Input() label = '';

  @Input()
  get dataSource(): DtFilterFieldDataSource { return this._dataSource; }
  set dataSource(dataSource: DtFilterFieldDataSource) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }
  private _dataSource: DtFilterFieldDataSource;
  private _dataSubscription: Subscription | null;
  private _stateChanges = new Subject<void>();

  /** Currently applied filters */
  @Input()
  get filters(): any[][] { return this._filters; }
  set filters(value: any[][]) {
    this._filters = value;
    this._switchToRootDef(false);
    this._changeDetectorRef.markForCheck();
  }
  private _filters: any[][] = [];

  /** Emits an event with the current value of the input field everytime the user types. */
  @Output() readonly inputChange = new EventEmitter<string>();

  /** Emits when a new filter has been added or removed. */
  @Output() readonly filterChanges = new EventEmitter<DtFilterFieldChangeEvent>();

  /**
   * List of tags that are the visual representation for selected nodes.
   * This can be used to disable certain tags or change their labeling.
   */
  @ViewChildren(DtFilterFieldTag) tags: QueryList<DtFilterFieldTag>;

  /** @internal Reference to the internal input element */
  @ViewChild('input', { static: true }) _inputEl: ElementRef;

  /** @internal The autocomplete trigger that is placed on the input element */
  @ViewChild(DtAutocompleteTrigger, { static: true }) _autocompleteTrigger: DtAutocompleteTrigger<DtNodeDef>;

  /** @internal The range trigger that is placed on the input element */
  @ViewChild(DtFilterFieldRangeTrigger, { static: true }) _filterfieldRangeTrigger: DtFilterFieldRangeTrigger;

  /** @internal Querylist of the autocompletes provided by ng-content */
  @ViewChild(DtAutocomplete, { static: true }) _autocomplete: DtAutocomplete<DtNodeDef>;

  /** @internal List of sources of the filter that the user currently works on. */
  _currentFilterSources: any[] | null = null;

  /** @internal The root NodeDef. The filter field will always switch to this def once the user completes a filter. */
  _rootDef: DtNodeDef | null = null;

  /** @internal The current NodeDef that will be displayed (autocomplete, free-text, ...) */
  _currentDef: DtNodeDef | null = null;

  /** @internal Holds the list of options and groups for displaying it in the autocomplete */
  _autocompleteOptionsOrGroups: DtNodeDef[] = [];

  /** @internal Filter nodes to be rendered _before_ the input element. */
  _prefixTagData: DtFilterFieldTagData[] = [];

  /** @internal Filter nodes to be rendered _after_ the input element. */
  _suffixTagData: DtFilterFieldTagData[] = [];

  /** @internal Holds the view value of the filter by label. Will be set when the first part of a filter has been selected. */
  _filterByLabel = '';

  /** @internal Value of the input element. */
  _inputValue = '';

  /** Emits whenever the component is destroyed. */
  private readonly _destroy = new Subject<void>();

  /** Whether the filter field or one of it's child elements is focused. */
  private _isFocused = false;

  /** Holds a complete list of all the ids of options that have been selected over time. */
  private _selectedOptionIds = new Set<string>();

  /** Holds the id of the currently selected option. */
  private _currentSelectedOptionId = '';

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _zone: NgZone,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef
  ) {
    this._stateChanges.pipe(
      switchMap(() => this._zone.onMicrotaskEmpty.pipe(take(1)))
    ).subscribe(() => {
      if (this._isFocused) {
        if (isDtAutocompleteDef(this._currentDef) ||
          (isDtFreeTextDef(this._currentDef) && this._currentDef.freeText.suggestions.length)) {
          // When the autocomplete closes after the user has selected an option
          // and the new data is also displayed in an autocomplete we need to open it again.
          // When the next selection is a FreeTextDef and it has suggestions, we also need to
          // show the panel again.
          // Note: Also trigger openPanel if it already open, so it does a reposition and resize
          this._autocompleteTrigger.openPanel();
        } else if (isDtRangeDef(this._currentDef)) {
          this._filterfieldRangeTrigger.openPanel();
          this._filterfieldRangeTrigger.range.focus();
          // need to return here, otherwise the focus would jump back into the filter field
          return;
        }
        // It is necessary to restore the focus back to the input field
        // so the user can directly coninue creating more filter nodes.
        // This be done once all microtasks have been completed (the zone is stable)
        // and the rendering has been finished.
        this.focus();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.label) {
      this._stateChanges.next();
    }
  }

  ngAfterViewInit(): void {
    // Monitoring the host element and every focusable child element on focus an blur events.
    // This is necessary so we can detect and restore focus after the input type has been changed.
    this._focusMonitor.monitor(this._elementRef.nativeElement, true)
      .pipe(takeUntil(this._destroy))
      .subscribe((origin) => { this._isFocused = isDefined(origin); });

    // tslint:disable-next-line:no-any
    this._autocomplete.optionSelected
      .subscribe((event: DtAutocompleteSelectedEvent<any>) => { this._handleAutocompleteSelected(event); });

    // Using fromEvent instead of an html binding so we get a stream and can easily do a debounce
    fromEvent(this._inputEl.nativeElement, 'input')
      .pipe(takeUntil(this._destroy), debounceTime(DT_FILTER_FIELD_TYPING_DEBOUNCE))
      .subscribe(() => { this._handleInputChange(); });
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    this._stateChanges.complete();

    if (this._dataSource) {
      this._dataSource.disconnect();
    }

    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }

    this._destroy.next();
    this._destroy.complete();
  }

  /** Focuses the filter-element element. */
  focus(): void {
    // As the host element is not focusable by it's own, we need to focus the internal input element
    if (this._inputEl) {
      this._inputEl.nativeElement.focus();
    }
  }

  /**
   * @internal
   * Handles the click on the host element. Prevent the event from bubbling up and open the autocomplete, range inputs, ...
   */
  _handleHostClick(event: MouseEvent): void {
    // Stop propagation so it does not bubble up and trigger an outside click
    // of the autocomplete which would close the autocomplete panel immediately
    event.stopImmediatePropagation();

    // This will not only focus the input, it will also trigger the autocomplete to open
    this.focus();
  }

  /** @internal Keep track of the values in the input fields. Write the current value to the _inputValue property */
  _handleInputChange(): void {
    const value = this._inputEl.nativeElement.value;
    if (value !== this._inputValue) {
      this._inputValue = value;
      this._updateAutocompleteOptionsOrGroups();
      this.inputChange.emit(value);

      this._changeDetectorRef.markForCheck();
    }
  }

  /** @internal */
  _handleInputKeyDown(event: KeyboardEvent): void {
    const keyCode = readKeyCode(event);
    if (keyCode === BACKSPACE && !this._inputValue.length) {
      if (this._currentFilterSources) {
        this._removeFilter(this._currentFilterSources);
      } else if (this._prefixTagData.length) {
        this._removeFilter(this._prefixTagData[this._prefixTagData.length - 1].filterSources);
      }
    } else if (keyCode === ESCAPE || (keyCode === UP_ARROW && event.altKey)) {
      this._autocompleteTrigger.closePanel();
      this._filterfieldRangeTrigger.closePanel();
    }
  }

  /** @internal */
  _handleInputKeyUp(event: KeyboardEvent): void {
    const keyCode = readKeyCode(event);
    if (keyCode === ENTER && this._inputValue.length && isDtFreeTextDef(this._currentDef)) {
      this._handleFreeTextSubmitted();
    }
  }

  /**
   * @internal
   * Handles removing a filter from the filters list.
   * Called when the user clicks on the remove button of a filter tag.
   */
  _handleTagRemove(event: DtFilterFieldTag): void {
    this._removeFilter(event.data.filterSources);
    this.focus();
  }

  /**
   * @internal
   * Handles switching a filter to the edit mode.
   * Usually called when the user clicks the edit button of a filter.
   */
  _handleTagEdit(event: DtFilterFieldTag): void {
    if (this._rootDef && !this._currentFilterSources) {
      const def = findDefForSourceObj(event.data.filterSources[0], this._rootDef);
      if (def) {
        const removed = event.data.filterSources.splice(1);
        this._currentFilterSources = event.data.filterSources;
        this._currentDef = def;

        this._removeSelectedOptionIdsOfSources(removed, def, this._currentSelectedOptionId);
        this._currentSelectedOptionId = peekOptionId(def, this._currentSelectedOptionId);

        this._updateAutocompleteOptionsOrGroups();
        this._updateFilterByLabel();
        this._updateTagData();
        this._isFocused = true;
        this.focus();
        // TODO: @thomas.pink please emit currentfilterchanges with async
        this._stateChanges.next();
        this._changeDetectorRef.markForCheck();
      }
    }
  }

  /** Handles selecting an option from the autocomplete. */
  private _handleAutocompleteSelected(event: DtAutocompleteSelectedEvent<DtNodeDef>): void {
    const optionDef = event.option.value;
    const sources = this._peekCurrentFilterSources();
    sources.push(optionDef.data);

    const optionId = peekOptionId(optionDef, this._currentSelectedOptionId);
    this._selectedOptionIds.add(optionId);

    if (isDtAutocompleteDef(optionDef) || isDtFreeTextDef(optionDef) || isDtRangeDef(optionDef)) {
      this._currentDef = optionDef;
      this._currentSelectedOptionId = optionId;
      this._updateFilterByLabel();
      this._updateAutocompleteOptionsOrGroups();
    } else {
      this._switchToRootDef(true);
    }

    // Reset input value to empty string after handling the value provided by the autocomplete.
    // Otherwise the value of the autocomplete would be in the input elements.
    this._writeInputValue('');

    // Clear any previous selected option.
    this._autocomplete.options.forEach((option) => {
      if (option.selected) { option.deselect(); }
    });

    this._stateChanges.next();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Handles submitting the free text field.
   * Usually called when the user hits enter in the input field when a free text is set.
   */
  private _handleFreeTextSubmitted(): void {
    const sources = this._peekCurrentFilterSources();
    sources.push(this._inputValue);

    this._writeInputValue('');
    this._switchToRootDef(true);
    this._stateChanges.next();
    this._changeDetectorRef.markForCheck();
  }

  /** @internal */
  _handleRangeSubmitted(event: DtFilterFieldRangeSubmittedEvent): void {
    const sources = this._peekCurrentFilterSources();
    sources.push({ operator: event.operator, range: event.range, unit: event.unit });

    this._filterfieldRangeTrigger.closePanel();
    this._isFocused = true;
    this._writeInputValue('');
    this._switchToRootDef(true);
    this._stateChanges.next();
    this._changeDetectorRef.markForCheck();
  }

  /** Write a value to the native input elements and set _inputValue property  */
  private _writeInputValue(value: string): void {
    // tslint:disable-next-line:no-unused-expression
    this._inputEl && (this._inputEl.nativeElement.value = value);
    if (this._inputValue !== value) {
      this._inputValue = value;
      this.inputChange.emit(value);
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Returns the currentFilterSources. If no currentFilterSources are available, a new one is created.
   * These sources will also be added to the global list of filters if they are not already part of it.
   */
  private _peekCurrentFilterSources(): any[] {
    let sources = this._currentFilterSources;
    if (!sources) {
      sources = [];
      this._currentFilterSources = sources;
    }
    if (this._filters.indexOf(sources) === -1) {
      this._filters.push(sources);
    }
    return sources;
  }

  /**
   * Removes a filter (a list of sources) from the list of current selected ones.
   * It is usually called when the user clicks the remove button of a filter
   */
  private _removeFilter(sources: any[]): void {
    const removableIndex = this._filters.indexOf(sources);
    if (removableIndex !== -1 && this._rootDef) {
      this._filters.splice(removableIndex, 1);
      this._removeSelectedOptionIdsOfSources(sources, this._rootDef);
      if (sources === this._currentFilterSources) {
        this._switchToRootDef(false);
      } else {
        this._updateTagData();
        this._updateAutocompleteOptionsOrGroups();
        this._filterByLabel = '';
      }
      this._emitFilterChanges([], [...sources]);
      this._stateChanges.next();
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Emits a DtFilterFieldChangeEvent with a cloned filters array
   * so the consumer can not override it from the outside.
   */
  private _emitFilterChanges(added: any[], removed: any[]): void {
    const cloned = this._filters.map((sources) => [...sources]);
    this.filterChanges.emit(new DtFilterFieldChangeEvent(this, added, removed, cloned));
  }

  /**
   * Takes a new Datasource and switches the filter date to the provided one.
   * Handles all the disconnecting and data switching.
   */
  private _switchDataSource(dataSource: DtFilterFieldDataSource): void {
    if (this._dataSource) {
      this._dataSource.disconnect();
    }

    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }

    this._dataSource = dataSource;

    this._dataSubscription = this._dataSource.connect()
      .pipe(takeUntil(this._destroy))
      .subscribe(
        (def) => {
          this._rootDef = def;
          this._currentDef = def;
          this._updateAutocompleteOptionsOrGroups();
          this._stateChanges.next();
          this._changeDetectorRef.markForCheck();
        },
        (error: Error) => {
          // If parsing the data in the datasource fails, we need to throw to notify the developer about the error.
          throw error;
        });
  }

  /**
   * Switches current def back to the root, updates all properties for the view and emits a filter change.
   * Is usually called when the user finishes a filter.
   */
  private _switchToRootDef(shouldEmit: boolean = false): void {
    this._currentDef = this._rootDef;
    let sourcesToEmit: any[] = [];
    if (this._currentFilterSources) {
      sourcesToEmit = [...this._currentFilterSources];
    }
    this._currentFilterSources = null;
    this._filterByLabel = '';
    this._currentSelectedOptionId = '';
    this._updateTagData();
    this._updateAutocompleteOptionsOrGroups();
    if (shouldEmit && sourcesToEmit.length) {
      this._emitFilterChanges(sourcesToEmit, []);
    }
  }

  /** Updates prefix and suffix tag data for displaying filter tags. */
  private _updateTagData(): void {
    if (this._rootDef) {
      this._prefixTagData =
        this._filters.slice(0, this._currentFilterSources ? this._filters.indexOf(this._currentFilterSources) : undefined)
        .map((sources, i) => transformSourceToTagData(sources, this._rootDef!) || this._prefixTagData[i] || null);

      this._suffixTagData = this._currentFilterSources ?
        this._filters.slice(this._filters.indexOf(this._currentFilterSources) + 1)
          .map((sources, i) => transformSourceToTagData(sources, this._rootDef!) || this._suffixTagData[i] || null)
          .filter((tag: DtFilterFieldTagData | null) => tag !== null) : [];
    }
  }

  /** Updates the list of options or groups displayed in the autocomplete overlay */
  private _updateAutocompleteOptionsOrGroups(): void {
    const currentDef = this._currentDef;

    if (isDtAutocompleteDef(currentDef)) {
      const def = filterAutocompleteDef(currentDef, this._selectedOptionIds, this._inputValue);
      this._autocompleteOptionsOrGroups = def ? def.autocomplete!.optionsOrGroups : [];
    } else if (isDtFreeTextDef(currentDef)) {
      const def = filterFreeTextDef(currentDef, this._inputValue);
      this._autocompleteOptionsOrGroups = def ? def.freeText!.suggestions : [];
    } else {
      this._autocompleteOptionsOrGroups = [];
    }
  }

  /** Updates the filterByLabel with the view value of the first currently active filter source. */
  private _updateFilterByLabel(): void {
    const currentFilterSources = this._currentFilterSources;
    if (this._rootDef && currentFilterSources && currentFilterSources.length) {
      const def = findDefForSourceObj(currentFilterSources[0], this._rootDef);
      if (isDtOptionDef(def)) {
        this._filterByLabel = def.option.viewValue;
      }
    }
  }

  /** Tries to remove all the ids from the selectedOptionsids list based on the provided sources array. */
  private _removeSelectedOptionIdsOfSources(sources: any[], rootDef: DtNodeDef, currentSelectedOptionId?: string): void {
    let def: DtNodeDef | null = rootDef;
    let selectedId = isDtOptionDef(def) ? peekOptionId(def, currentSelectedOptionId) : (currentSelectedOptionId || '');
    sources.forEach((source) => {
      def = findDefForSourceObj(source, def!);
      if (def !== null) {
        selectedId = peekOptionId(def, selectedId);
        this._selectedOptionIds.delete(selectedId);
      } else {
        return;
      }
    });
  }
}
