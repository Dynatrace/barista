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

import { CdkHeaderCellDef } from '@angular/cdk/table';
import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { DtColumnDef, _updateDtColumnStyles } from '../cell';

/**
 * Header cell definition for the dt-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[dtHeaderCellDef]',
  exportAs: 'dtHeaderCellDef',
  providers: [{ provide: CdkHeaderCellDef, useExisting: DtHeaderCellDef }],
})
export class DtHeaderCellDef extends CdkHeaderCellDef {}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'dt-header-cell, [dtHeaderCell]',
  exportAs: 'dtHeaderCell',
  host: {
    class: 'dt-header-cell',
    role: 'columnheader',
  },
})
export class DtHeaderCell implements OnDestroy {
  /** Destroy subject which will fire when the component gets destroyed. */
  private _destroy = new Subject<void>();

  /** @internal Keep reference to element so it can be accessed as needed. */
  _elemRef: ElementRef;
  /** @internal Keep reference to columnDef so it can be accessed as needed. */
  _colDef: DtColumnDef;

  constructor(columnDef: DtColumnDef, elem: ElementRef) {
    columnDef._stateChanges
      .pipe(startWith(null), takeUntil(this._destroy))
      .subscribe(() => {
        _updateDtColumnStyles(columnDef, elem);
      });
    this._elemRef = elem;
    this._colDef = columnDef;
  }

  ngOnDestroy(): void {
    // Exhaustively check if the subjects still exist during the onDestroy
    // ADES-5588
    if (this._destroy) {
      this._destroy.next();
      this._destroy.complete();
    }
  }
}
