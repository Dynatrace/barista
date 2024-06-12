/**
 * @license
 * Copyright 2022 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EmbeddedViewRef,
  Inject,
  Input,
  IterableDiffers,
  NgZone,
  OnDestroy,
  Optional,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Subscription, BehaviorSubject } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { DtEmptyState } from '@dynatrace/barista-components/empty-state';

import { _DtTableBase } from './base-table';
import {
  DtSimpleColumnComparatorFunction,
  DtSimpleColumnDisplayAccessorFunction,
  DtSimpleColumnSortAccessorFunction,
  DtSimpleColumnBase,
} from './simple-columns/simple-column-base';
import { DtHeaderCell } from './header/header-cell';
import { DtRow } from './row';
import {
  isDataSource,
  _DisposeViewRepeaterStrategy,
  _ViewRepeater,
  _VIEW_REPEATER_STRATEGY,
} from '@angular/cdk/collections';
import {
  RenderRow,
  RowContext,
  StickyPositioningListener,
  STICKY_POSITIONING_LISTENER,
  _CoalescedStyleScheduler,
  _COALESCED_STYLE_SCHEDULER,
  CdkTable,
  CDK_TABLE,
} from '@angular/cdk/table';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DtTableSelection } from './selection/selection';
import { isObject } from '@dynatrace/barista-components/core';
import { DtTableDataSource } from './table-data-source';

interface SimpleColumnsAccessorMaps<T> {
  displayAccessorMap: Map<string, DtSimpleColumnDisplayAccessorFunction<T>>;
  sortAccessorMap: Map<string, DtSimpleColumnSortAccessorFunction<T>>;
  comparatorMap: Map<string, DtSimpleColumnComparatorFunction<T>>;
}

const DOWNLOAD_DELIMITER = '◬';

let nextUniqueId = 0;
@Component({
  selector: 'dt-table',
  styleUrls: ['./table.scss'],
  templateUrl: './table.html',
  exportAs: 'dtTable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  host: {
    class: 'dt-table',
    '[class.dt-table-interactive-rows]': 'interactiveRows',
    '[class.dt-table-expandable-rows]': '_hasExpandableRows',
  },
  providers: [
    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _DisposeViewRepeaterStrategy,
    },
    { provide: CdkTable, useExisting: DtTable },
    { provide: CDK_TABLE, useExisting: DtTable },
  ],
})
export class DtTable<T> extends _DtTableBase<T> implements OnDestroy {
  private _multiExpand: boolean; // TODO: discuss default value with UX, should maybe change from false to true
  private _loading: boolean;
  private _destroy$ = new Subject<void>();

  private _showExportButton: boolean | 'visible' | 'table' = false; //Display button for Visible, Table, both (true), or neither (false)
  private _exportExcludeList: string[] = [];

  /** Sort accessor map that holds all sort accessor functions from the registered simple columns. */
  private _sortAccessorMap = new Map<
    string,
    DtSimpleColumnSortAccessorFunction<T>
  >();
  /** Sort accessor map that holds all display accessor functions from the registered simple columns. */
  private _displayAccessorMap = new Map<
    string,
    DtSimpleColumnDisplayAccessorFunction<T>
  >();
  /** Sort accessor map that holds all comparator accessor functions from the registered simple columns. */
  private _comparatorFunctionMap = new Map<
    string,
    DtSimpleColumnComparatorFunction<T>
  >();

  /** @internal A generated UID */
  _uniqueId = `dt-table-${nextUniqueId++}`;

  /** @internal Whether a expandable row is registered with the table */
  _hasExpandableRows = false;

  /** @internal Reference to filteredData in table-data-source */
  _filteredData: T[];

  /** @internal Reference to exportable data. */
  _exporter: {
    filteredData: T[];
    selection: DtTableSelection<T> | null;
  };

  /** @internal Determine if selection is enabled and properly connected. */
  get _selectionEnabledAndConnected(): boolean {
    if (this._exporter && this._exporter.selection) return true;
    else return false;
  }

  /** The number of rows that have been selected by the user. */
  get numSelectedRows(): number {
    if (
      this._exporter &&
      this._exporter.selection != null &&
      this._exporter.selection.selected
    )
      return this._exporter.selection.selected.length;
    else return 0;
  }

  /** Whether the loading state should be displayed. */
  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = coerceBooleanProperty(value);
  }

  /** Whether multiple rows can be expanded at a time. */
  @Input()
  get multiExpand(): boolean {
    return this._multiExpand;
  }
  set multiExpand(value: boolean) {
    this._multiExpand = coerceBooleanProperty(value);
  }

  /** Whether the datasource is empty. */
  get isEmptyDataSource(): boolean {
    return !(this._data && this._data.length);
  }

  /**
   * Experimental!
   * Opt-in to the possibility to export all table data, visible table data or
   * selected table data into a csv file.
   */
  @Input()
  get showExportButton(): boolean | 'visible' | 'table' {
    return this._showExportButton;
  }
  set showExportButton(value: boolean | 'visible' | 'table') {
    if (value === 'visible' || value === 'table')
      this._showExportButton = value;
    else this._showExportButton = coerceBooleanProperty(value);
  }
  static ngAcceptInputType_showExportButton: BooleanInput;

  /** Do not export certain columns, e.g. for confidentiality or problematic data */
  @Input()
  get exportExcludeList(): string[] {
    return this._exportExcludeList;
  }
  set exportExcludeList(value: string[]) {
    this._exportExcludeList = value ? value : [];
  }

  /** @internal The snapshot of the current data */
  get _dataSnapshot(): T[] | readonly T[] {
    return this._data;
  }

  /** @internal The QueryList that holds the empty state component */
  @ContentChildren(DtEmptyState) _emptyState: QueryList<DtEmptyState>;

  /** @internal The template where the empty state component gets rendered inside */
  @ViewChild('emptyStateTemplate', { static: true })
  _emptyStateTemplate: TemplateRef<DtEmptyState>;

  /** @internal The portal where the component will be projected in when we have to show the empty state. */
  @ViewChild(CdkPortalOutlet, { static: true })
  _portalOutlet: CdkPortalOutlet;

  /** @internal A list of complex columns */
  @ContentChildren(DtHeaderCell, { descendants: true })
  _childNonSimpleColumns: QueryList<DtHeaderCell>;
  /** @internal A list of simple columns */
  @ContentChildren(DtSimpleColumnBase) _childSimpleColumns: QueryList<
    DtSimpleColumnBase<T>
  >;

  /** @internal Stream of all simple dataAccessor functions for all SimpleColumns */
  _dataAccessors = new BehaviorSubject<SimpleColumnsAccessorMaps<T>>({
    displayAccessorMap: this._displayAccessorMap,
    sortAccessorMap: this._sortAccessorMap,
    comparatorMap: this._comparatorFunctionMap,
  });

  /** Updates the dataAccessors subject for the connected datasource. */
  private _updateAccessors(): void {
    this._dataAccessors.next({
      displayAccessorMap: this._displayAccessorMap,
      sortAccessorMap: this._sortAccessorMap,
      comparatorMap: this._comparatorFunctionMap,
    });
  }

  /** Subscription of attached stream of the portal outlet  */
  private _portalOutletSubscription = Subscription.EMPTY;

  constructor(
    differs: IterableDiffers,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
    @Attribute('role') role: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(DOCUMENT) document: any,
    platform: Platform,
    private _viewContainerRef: ViewContainerRef,
    @Inject(_VIEW_REPEATER_STRATEGY)
    _viewRepeater: _ViewRepeater<T, RenderRow<T>, RowContext<T>>,
    @Inject(_COALESCED_STYLE_SCHEDULER)
    _coalescedStyleScheduler: _CoalescedStyleScheduler,
    _viewportRuler: ViewportRuler,
    @Optional()
    @SkipSelf()
    @Inject(STICKY_POSITIONING_LISTENER)
    _stickyPositioningListener: StickyPositioningListener,
    @Optional() protected readonly _ngZone: NgZone,
  ) {
    super(
      differs,
      changeDetectorRef,
      elementRef,
      document,
      platform,
      _viewRepeater,
      _coalescedStyleScheduler,
      _viewportRuler,
      role,
      _stickyPositioningListener,
      _ngZone,
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Exhaustively check if the subjects still exist during the onDestroy
    // ADES-5588
    if (this._destroy$) {
      this._destroy$.next();
      this._destroy$.complete();
    }
    if (this._portalOutletSubscription) {
      this._portalOutletSubscription.unsubscribe();
    }
  }

  /**
   * Renders rows based on the table's latest set of data,
   * which was either provided directly as an input or retrieved
   * through an Observable stream (directly or from a DataSource).
   */
  renderRows(): void {
    // To prevent an error that was thrown when the the component containing
    // the table was destroyed. `"Cannot move a destroyed View in a ViewContainer!"`
    //
    // This check is necessary because the cdkTable does not check
    // if the view is already destroyed before moving it
    // https://github.com/angular/components/blob/c68791db9a0b4107d04fa924c27a087cd00a8989/src/cdk/table/table.ts#L637
    //
    // The dependency for the _rowOutlet internal is safe, as we already
    // depend on this one for the template as well.
    const rowOutletViewContainer = this._rowOutlet.viewContainer;
    let shouldRender = false;

    // Figure out if all views within the viewContainer are already
    // destroyed.
    for (let i = 0; i < rowOutletViewContainer.length; i += 1) {
      const view = rowOutletViewContainer.get(i);
      if (view?.destroyed === false) {
        shouldRender = true;
        break;
      }
    }

    // Only if not all view containers have been destroyed, or if
    // there are no viewContainers at all.
    if (shouldRender || rowOutletViewContainer.length === 0) {
      super.renderRows();
    }

    // no need if there is no empty state provided via content projection
    if (!this._emptyState.first) {
      return;
    }

    // if we have a subscription we need to unsubscribe to re-subscribe later on
    // we need to subscribe in this function in case that there is no other hook
    // where we can hook into the cdk Table
    if (this._portalOutletSubscription) {
      this._portalOutletSubscription.unsubscribe();
    }

    this._portalOutletSubscription = this._portalOutlet.attached
      .pipe(mapTo(this._emptyState.first))
      .subscribe((emptyState) => {
        // Update the layout of the empty state after it was attached
        emptyState._visible = true;
      });

    if (this.isEmptyDataSource) {
      if (!this._portalOutlet.hasAttached()) {
        const template = new TemplatePortal(
          this._emptyStateTemplate,
          this._viewContainerRef,
        );
        this._portalOutlet.attachTemplatePortal(template);
      }
      this._emptyState.first._visible = true;
      this._changeDetectorRef.markForCheck();
    } else {
      // ned to unset the visibility to have every time the component will be attached a fading animation.
      this._emptyState.first._visible = false;
      this._portalOutlet.detach();
    }
  }

  /** Update the column accessor functions  */
  _updateColumnAccessors(
    name: string,
    displayAccessor?: DtSimpleColumnDisplayAccessorFunction<T>,
    sortAccessor?: DtSimpleColumnSortAccessorFunction<T>,
    comparatorFunction?: DtSimpleColumnComparatorFunction<T>,
  ): void {
    if (displayAccessor) {
      this._displayAccessorMap.set(name, displayAccessor);
    } else {
      this._displayAccessorMap.delete(name);
    }
    if (sortAccessor) {
      this._sortAccessorMap.set(name, sortAccessor);
    } else {
      this._sortAccessorMap.delete(name);
    }
    if (comparatorFunction) {
      this._comparatorFunctionMap.set(name, comparatorFunction);
    } else {
      this._comparatorFunctionMap.delete(name);
    }
    this._updateAccessors();
  }

  /** @internal Helper function for simple columns to unregister their sort accessors. */
  _removeColumnAccessors(name: string): void {
    this._sortAccessorMap.delete(name);
    this._displayAccessorMap.delete(name);
    this._comparatorFunctionMap.delete(name);
    this._updateAccessors();
  }

  /** CSS class added to any row or cell that has sticky positioning applied. */
  protected stickyCssClass = 'dt-table-sticky';

  /** @internal Exports the filtered source data from the dataSource. */
  // Note: this is different from the display text, see instead _exportDisplayData().
  _exportFilteredData(selectedData?: T[]): void {
    const csvObj = this._generateFilteredCSV(selectedData);
    if (csvObj) this._downloadCSV(csvObj.csv);
  }

  /** @internal Generate filtered CSV. Seperated from _exportFilteredData to facilitate unit testing. */
  _generateFilteredCSV(selectedData?: T[]): { csv: string } | null {
    //nothing to export
    if (this.isEmptyDataSource) {
      return null;
    }

    const exportData = determineDataToExport(this, selectedData);
    if (!exportData) {
      return null;
    }

    const csvObj = { csv: '' };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const keys: string[] = Object.keys(exportData[0] as any).filter(
      (h: string) => !this.exportExcludeList.includes(h),
    );

    if (!keys.length) {
      return null;
    }

    recurseSubkeys(exportData[0], keys);
    // header row
    csvObj.csv +=
      keys
        .map((headerKey) => {
          // Restore the value with separated `.` in the final output csv
          const delimiterReplace = new RegExp(`${DOWNLOAD_DELIMITER}`, 'g');
          return headerKey.replace(delimiterReplace, '.');
        })
        .join(',') + '\n';

    for (const row of exportData) {
      for (let idx = 0; idx < keys.length; idx++) {
        const key = keys[idx];
        let val: unknown;
        if (
          key.includes(DOWNLOAD_DELIMITER) &&
          typeof row[key] == 'undefined'
        ) {
          val = deepObjectAccess(row, key);
        } else {
          val = row[key];
        }
        this._appendValToCSV(csvObj, val, idx, keys.length);
      }
      csvObj.csv += '\n';
    }
    return csvObj;

    /**
     * @internal Data can end up in a table many ways, figure out the best to use for exporting table data
     * @param table {DtTable<T>} - pass 'this' to inner function
     * @param selectedData {T[]} - pass parent's param down simply for clarity
     */
    function determineDataToExport(
      table: DtTable<T>,
      _selectedData?: T[],
    ): T[] | null {
      let _exportData: T[] | null = null;
      const DS = isDataSource(table.dataSource)
        ? (table.dataSource as DtTableDataSource<T>)
        : null;

      //Prefer selected data if available
      if (_selectedData) _exportData = _selectedData;

      //Next prefer data from dataSource
      if (!_exportData && DS) {
        if (Array.isArray(DS.filteredData) && isObject(DS.filteredData[0]))
          _exportData = DS.filteredData;
        else if (Array.isArray(DS.data) && isObject(DS.data[0]))
          _exportData = DS.data;
      }

      //Lastly look for data directly in the table
      if (!_exportData) {
        if (
          Array.isArray(table._filteredData) &&
          isObject(table._filteredData[0])
        )
          _exportData = table._filteredData;
        else if (Array.isArray(table._data) && isObject(table._data[0]))
          _exportData = table._data;
      }
      return _exportData;
    }

    /** @internal Recursively traverse an object structure while building out a deep access key list */
    function recurseSubkeys(
      obj: T,
      keyList: string[],
      prefix = '',
      maxLevels = 5,
    ): void {
      //check for objects, expand properties into new columns
      for (let i = keyList.length - 1; i > -1; i--) {
        const key = keyList[i];
        const val = obj[key];
        if (typeof val == 'object') {
          const subkeys = [] as string[];
          for (const subkey of Object.keys(val)) {
            const subval = val[subkey];
            const subprefix = prefix.length
              ? `${prefix}${DOWNLOAD_DELIMITER}${key}${DOWNLOAD_DELIMITER}${subkey}`
              : `${key}${DOWNLOAD_DELIMITER}${subkey}`;
            if (maxLevels && typeof subval == 'object') {
              const subsubkeys = Object.keys(subval);
              recurseSubkeys(subval, subsubkeys, subprefix, maxLevels - 1);
              for (const subsubkey of subsubkeys)
                if (
                  ['object', 'undefined'].includes(typeof subval[subsubkey])
                ) {
                  subkeys.push(subsubkey);
                } else {
                  subkeys.push(`${subprefix}${DOWNLOAD_DELIMITER}${subsubkey}`);
                }
            } else {
              subkeys.push(subprefix);
            }
          }
          keyList.splice(i, 1, ...subkeys);
        }
      }
    }

    /** @internal Access a deep property from an object structure using a dotted key, as built by recurseSubkeys() */
    function deepObjectAccess(obj: T, key: string): string {
      if (key.includes(DOWNLOAD_DELIMITER)) {
        const keyArr = key.split(DOWNLOAD_DELIMITER);
        const first = keyArr.shift() || '';
        const subObj = obj[first];
        if (typeof subObj == 'object') {
          return deepObjectAccess(subObj, keyArr.join(DOWNLOAD_DELIMITER));
        } else if (typeof subObj == 'undefined') {
          return '';
        } else {
          return subObj.toString();
        }
      } else {
        return obj[key];
      }
    }
  }

  /** @internal Exports the filtered display data from the dataSource after being formatted by a displayAccessor. */
  _exportDisplayData(selectedData?: T[]): void {
    const csvObj = this._generateDisplayCSV(selectedData);
    if (csvObj) {
      this._downloadCSV(csvObj.csv);
    }
  }

  /** @internal Generate display data for _exportDisplayData. Seperated out to facilitate unit testing. */
  _generateDisplayCSV(selectedData?: T[]): { csv: string } | null {
    //nothing to export
    if (this.isEmptyDataSource) {
      return null;
    }
    //not using DTDataSource, fallback to this._data instead of this._filteredData
    let exportData: readonly T[];
    if (selectedData) {
      exportData = selectedData;
    } else {
      exportData =
        Array.isArray(this._filteredData) && isObject(this._filteredData[0])
          ? this._filteredData
          : this._data;
    }

    //Determine column keys and labels
    const csvObj = { csv: '' };
    const simpleColumns = this._childSimpleColumns
      .filter((col) => !this.exportExcludeList.includes(col.name))
      .map((col) => ({ name: col.name, label: col.label }));
    const complexColumns = this._childNonSimpleColumns
      .filter((col) => !this.exportExcludeList.includes(col._colDef.name))
      .map((col) => ({
        name: col._colDef.name,
        label: col._elemRef.nativeElement.textContent,
      }));
    const headerMap = simpleColumns.concat(complexColumns);
    const columns = [...this._contentHeaderRowDefs.first.columns];
    const keys = columns.filter((c) => !this.exportExcludeList.includes(c));
    const headers = keys.map(
      (col) => (headerMap.find((h) => h.name == col) || { label: '' }).label,
    );

    // header row
    csvObj.csv += headers.join(',') + '\n';

    //Determine if data not included in data source
    const tempRow = exportData[0];
    const missingColumns = keys.filter((k) => typeof tempRow[k] == 'undefined');
    if (missingColumns.length) {
      /* Data has been put directly into table instead of dataSource
          Fallback and extract visable data from rows
          Note: only extracts visible rows
       */
      const rowCount = this._rowOutlet.viewContainer.length;
      for (let i = 0; i < rowCount; i++) {
        const rowEl = (
          this._rowOutlet.viewContainer.get(i) as EmbeddedViewRef<DtRow>
        ).rootNodes[0];
        const cells = rowEl.querySelectorAll('.dt-cell');
        for (let j = 0; j < cells.length; j++) {
          //if excluded, skip
          if (!keys.includes(columns[j])) {
            continue;
          }
          //if an expandable cell, treat as blank, otherwise get text from cell
          const txt = cells[j].matches('.dt-expandable-cell')
            ? ''
            : cells[j].innerText;
          this._appendValToCSV(csvObj, txt, j, cells.length);
        }
        this._appendNLtoCSV(csvObj, keys, columns);
      }
    } else {
      //Prefer data from dataSource as it gets all pages
      // data rows
      for (const row of exportData) {
        for (let idx = 0; idx < keys.length; idx++) {
          const key = keys[idx];
          const accessor = this._displayAccessorMap.get(key);
          const val = accessor ? accessor(row, key) : row[key];
          this._appendValToCSV(csvObj, val, idx, keys.length);
        }
        this._appendNLtoCSV(csvObj, keys, columns);
      }
    }
    return csvObj;
  }

  /** Assemble the CSV while safely handling types. */
  private _appendValToCSV(
    csvObj: { csv: string },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val: any,
    idx: number,
    len: number,
  ): void {
    switch (typeof val) {
      case 'string':
        //replace newlines and tabs with spaces to avoid breaking CSV format
        val = val.replace(/[\n\r\t]/g, ' ');
        break;
      case 'object': //if it's still complex, just convert to JSON and move on
        val = JSON.stringify(val);
        break;
      case 'undefined':
        val = '';
        break;
      default:
        val = val.toString();
    }

    if (val.includes(',')) {
      val = val.replace(/"/g, '""'); //escape any existing double quotes
      csvObj.csv += `"${val}"`; //
    } else {
      csvObj.csv += val;
    }
    if (idx < len) {
      csvObj.csv += ',';
    }
  }

  /** Append newline to CSV safely */
  private _appendNLtoCSV(
    csvObj: { csv: string },
    keys: string[],
    columns: string[],
  ): void {
    //handle excluded last column
    if (
      !keys.includes(columns[columns.length - 1]) &&
      csvObj.csv.charAt(csvObj.csv.length - 1) === ','
    )
      csvObj.csv = csvObj.csv.substring(0, csvObj.csv.length - 1);

    //next line
    csvObj.csv += '\n';
  }

  /** @internal Export only the rows which are currently selected. */
  _exportSelection(): void {
    if (this._exporter.selection) {
      this._exportDisplayData(this._exporter.selection.selected);
    } else {
      console.log('no selection');
    }
  }

  /** Take a CSV string and trigger a download in browser */
  private _downloadCSV(csv: string): void {
    //make csv document
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'table-' + new Date().getTime() + '.csv';
    link.click();
    link.remove();
  }
}
