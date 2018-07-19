import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  QueryList,
  ContentChildren,
  Output,
  EventEmitter,
  AfterContentInit,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
  forwardRef,
  Optional,
} from '@angular/core';
import { DtTab, DtTabChange } from './tab';
import {
  mixinColor,
  mixinDisabled,
  DtLoggerFactory,
  DtLogger,
  CanDisable,
  CanColor,
} from '@dynatrace/angular-components/core';
import { Subscription, merge } from 'rxjs';

export const DT_TABGROUP_SINGLE_TAB_ERROR = 'Only one single tab is not allowed inside a tabgroup';

export const DT_TABGROUP_NO_ENABLED_TABS_ERROR = 'At least one tab must be enabled at all times';

const LOG: DtLogger = DtLoggerFactory.create('DtTabGroup');

export class DtTabGroupBase {
  constructor(public _elementRef: ElementRef) {}
}
export const _DtTabGroupMixinBase = mixinColor(mixinDisabled(DtTabGroupBase), 'main');

/** Used to generate unique ID's for each tab component */
let nextId = 0;

@Component({
  moduleId: module.id,
  selector: 'dt-tab-group',
  exportAs: 'dtTabGroup',
  templateUrl: 'tab-group.html',
  styleUrls: ['tab-group.scss'],
  host: {
    class: 'dt-tab-group',
    role: 'tablist',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class DtTabGroup extends _DtTabGroupMixinBase implements AfterContentInit, OnDestroy, CanColor, CanDisable {
  // tslint:disable-next-line:no-forward-ref
  @ContentChildren(forwardRef(() => DtTab)) _tabs: QueryList<DtTab>;

  /** Subscription to tabs being added/removed. */
  private _tabsSubscription = Subscription.EMPTY;

  /** Subscription to the state of a tab */
  private _tabStateSubscription = Subscription.EMPTY;

  _selected: DtTab | null = null;
  /** internal only - used to notify only the tabs in the same tab-group */
  _groupId = `dt-tab-group-${++nextId}`;

  // tslint:disable-next-line:no-output-named-after-standard-event
  @Output() readonly change = new EventEmitter<DtTabChange>();

  constructor(elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {
    super(elementRef);
  }

  ngAfterContentInit(): void {
    /** subscribe to initial tab state changes */
    this._validateTabs();
    this._subscribeToTabStateChanges();
    this._selectFirstEnabledTab();
    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this._tabsSubscription = this._tabs.changes.subscribe(() => {
      this._validateTabs();
      // if selected tab got removed - select the first enabled again
      if (!this._tabs.find((tab) => tab === this._selected)) {
        this._selectFirstEnabledTab();
      }
      // after tabs changed we need to subscribe again
      this._subscribeToTabStateChanges();
      /** this is necessary so the loop with the portaloutlets gets rerendered */
      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this._tabsSubscription.unsubscribe();
  }

  /** internal - Dispatch change event with current selection - dispatched inside the tab */
  _emitChangeEvent(): void {
    this.change.emit({ source: this._selected! });
  }

  /** Returns a unique id for each tab content element */
  _getTabContentId(tabId: string): string {
    return `${this._groupId}-content-${tabId}`;
  }

  /**
   * Subscribes to state changes of all tabs
   * this is necessary so we get notified when the inputs of the tab change
   * we need to trigger change detection on the group since the group needs to render the header again
   */
  private _subscribeToTabStateChanges(): void {
    if (this._tabStateSubscription) { this._tabStateSubscription.unsubscribe(); }
    this._tabStateSubscription = merge(...this._tabs.map((tab) => tab._stateChanges))
    .subscribe(() => {
      /** check if the selected tab is disabled now */
      if (this._selected && this._selected.disabled) {
        this._selected = null;
        this._selectFirstEnabledTab();
      }
      this._changeDetectorRef.markForCheck();
    });
  }

  private _selectFirstEnabledTab(): void {
    if (this._tabs) {
      const hasEnabledTabs = this._tabs.some((t) => !t.disabled);
      if (!hasEnabledTabs) {
        LOG.error(DT_TABGROUP_NO_ENABLED_TABS_ERROR);
      }
      if (hasEnabledTabs && !this._tabs.find((t) => t === this._selected)) {
        const firstEnabled = this._findFirstEnabledTab();
        if (firstEnabled) {
          firstEnabled.selected = true;
        }
      }
    }
  }

  /**
   * Returns the first enabled tab
   */
  private _findFirstEnabledTab(): DtTab | undefined {
    return this._tabs.find((t: DtTab, idx: number) => !t.disabled);
  }

  /** Check that more than one tab is available */
  private _validateTabs(): void {
    if (this._tabs.length <= 1) {
      LOG.error(DT_TABGROUP_SINGLE_TAB_ERROR);
    }
  }
}
