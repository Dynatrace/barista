import {
  Input,
  ElementRef,
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  TemplateRef,
  ContentChild,
  ViewContainerRef,
  ChangeDetectorRef,
  OnDestroy,
  Optional,
  Inject,
  forwardRef,
} from '@angular/core';
import { mixinDisabled, CanDisable, mixinTabIndex, HasTabIndex } from '@dynatrace/angular-components/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { DtTabLabel } from './tab-label';
import { DtTabContent } from './tab-content';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { DtTabGroup } from '../tab-group';
import { Subject } from 'rxjs';

let nextUniqueId = 0;

export class DtTabChange {
  /** Reference to the currently-selected tab. */
  source: DtTab;
}

export type TabThemePalette = 'main' | 'error' | 'recovered' | undefined;
const defaultPalette: TabThemePalette = 'main';

// Boilerplate for applying mixins to DtTab.
export class DtTabBase {
  constructor(public _elementRef: ElementRef) { }
}
export const _DtTabMixinBase = mixinTabIndex(mixinDisabled(DtTabBase));

@Component({
  moduleId: module.id,
  selector: 'dt-tab',
  exportAs: 'dtTab',
  templateUrl: 'tab.html',
  inputs: ['disabled', 'color'],
  host: {
    class: 'dt-tab',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class DtTab extends _DtTabMixinBase implements OnInit, OnDestroy, CanDisable, HasTabIndex {

  /** Content for the tab label */
  @ContentChild(DtTabLabel) label: DtTabLabel;

  /** ContentRef if the content is provided inside a ng-template with a dtTabContent directive for lazy loading */
  // tslint:disable-next-line:no-any
  @ContentChild(DtTabContent, {read: TemplateRef}) _lazyContentRef: TemplateRef<any>;

  /** Unique id of the element. */
  @Input()
  get id(): string { return this._id; }
  set id(value: string) {
    this._id = value || this._uniqueId;
    this._addListenerForUniqueSelection();
  }

  /** Wether the tab is disabed */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    const newDisabledState = coerceBooleanProperty(value);
    if (this._disabled !== newDisabledState) {
      this._disabled = newDisabledState;
      this._changeDetectorRef.markForCheck();
    }
    this._stateChanges.next();
  }

  /** Whether tab is selected. */
  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    const newSelectedState = coerceBooleanProperty(value);

    if (this._selected !== newSelectedState) {
      this._selected = newSelectedState;

      if (newSelectedState && this._tabGroup && this._tabGroup._selected !== this) {
        this._tabGroup._selected = this;
        // Notify all other tabs to un-check in the same group
        this._tabDispatcher.notify(this.id, this._tabGroup._groupId);
        this._tabGroup._emitChangeEvent();
      }
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * Color of the tab
   * mixinColor is not working here because the dt-tab does not get rendered to the dom this input is just a proxy
   * so the color gets applied correctly with the dtColor directive on the header
   */
  @Input()
  get color(): TabThemePalette { return this._color; }
  set color(value: TabThemePalette) {
    this._color = value;
    this._stateChanges.next();
  }

  /** Aria label for the tab. */
  @Input('aria-label') ariaLabel: string;

  /** Reference to the element that the tab is labelled by. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Internal stream that emits whenever an input of a tab changes */
  readonly _stateChanges = new Subject<void>();

  /** Portal that will be the hosted content of the tab */
  private _contentPortal: TemplatePortal | null = null;

  private _uniqueId = `dt-tab-${++nextUniqueId}`;
  private _removeUniqueSelectionListener: () => void = () => {};
  private _selected = false;
  private _disabled = false;
  private _color: TabThemePalette = defaultPalette;
  private _id: string;

  /** private only used in the tabgroup to get the content template portal */
  get _content(): TemplatePortal | null {
    return this._contentPortal;
  }

  constructor(
    elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _tabDispatcher: UniqueSelectionDispatcher,
    // tslint:disable-next-line:no-forward-ref
    @Inject(forwardRef(() => DtTabGroup)) @Optional() private _tabGroup: DtTabGroup
  ) {
    super(elementRef);
    // Force setter to be called in case id was not specified.
    this.id = this.id;
  }

  ngOnInit(): void {
    if (this._lazyContentRef) {
      this._contentPortal = new TemplatePortal(
        this._lazyContentRef, this._viewContainerRef);
    }
    if (this._tabGroup) {
      this.selected = this._tabGroup._selected === this;
    }
  }

  ngOnDestroy(): void {
    this._removeUniqueSelectionListener();
  }

  _select(): void {
    this.selected = true;
  }

  private _addListenerForUniqueSelection(): void {
    this._removeUniqueSelectionListener();
    this._removeUniqueSelectionListener = this._tabDispatcher.listen((id: string, groupid: string) => {
      if (id !== this._id && this._tabGroup._groupId === groupid && this.selected) {
        this.selected = false;
      }
    });
  }
}
