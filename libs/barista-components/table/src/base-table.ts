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

import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import {
  _DisposeViewRepeaterStrategy,
  _ViewRepeater,
  _VIEW_REPEATER_STRATEGY,
} from '@angular/cdk/collections';
import { Platform } from '@angular/cdk/platform';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  CDK_TABLE_TEMPLATE,
  CdkTable,
  CdkTableModule,
  RowContext,
  RenderRow,
  _CoalescedStyleScheduler,
  StickyPositioningListener,
  _COALESCED_STYLE_SCHEDULER,
  STICKY_POSITIONING_LISTENER,
  CDK_TABLE,
} from '@angular/cdk/table';
import { DOCUMENT } from '@angular/common';
import {
  Attribute,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  IterableDiffers,
  NgModule,
  NgZone,
  Optional,
  SkipSelf,
} from '@angular/core';

@Component({
  selector: 'dt-table-base',
  template: CDK_TABLE_TEMPLATE,
  providers: [
    { provide: _COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _DisposeViewRepeaterStrategy,
    },
    { provide: CdkTable, useExisting: _DtTableBase },
    { provide: CDK_TABLE, useExisting: _DtTableBase },
  ],
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class _DtTableBase<T> extends CdkTable<T> {
  private _interactiveRows = false;

  /** Whether the defined rows are interactive. */
  @Input()
  get interactiveRows(): boolean {
    return this._interactiveRows;
  }
  set interactiveRows(value: boolean) {
    this._interactiveRows = coerceBooleanProperty(value);
  }
  static ngAcceptInputType_interactiveRows: BooleanInput;

  constructor(
    differs: IterableDiffers,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(DOCUMENT) document: any,
    platform: Platform,
    @Inject(_VIEW_REPEATER_STRATEGY)
    _viewRepeater: _ViewRepeater<T, RenderRow<T>, RowContext<T>>,
    @Inject(_COALESCED_STYLE_SCHEDULER)
    _coalescedStyleScheduler: _CoalescedStyleScheduler,
    _viewportRuler: ViewportRuler,
    @Attribute('role') protected _role: string,
    @Optional()
    @SkipSelf()
    @Inject(STICKY_POSITIONING_LISTENER)
    _stickyPositioningListener: StickyPositioningListener,
    @Optional() protected readonly _ngZone: NgZone,
    @Attribute('interactiveRows') interactiveRows?: boolean,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super(
      differs,
      changeDetectorRef,
      elementRef,
      _role,
      null as unknown as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      document,
      platform,
      _viewRepeater,
      _coalescedStyleScheduler,
      _viewportRuler,
      _stickyPositioningListener,
      _ngZone,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.interactiveRows = interactiveRows!;
  }
}

@NgModule({
  imports: [CdkTableModule],
  exports: [_DtTableBase],
  declarations: [_DtTableBase],
})
// eslint-disable-next-line @typescript-eslint/naming-convention
export class _DtTableBaseModule {}
