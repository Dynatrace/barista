import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation, ChangeDetectorRef, Output, EventEmitter, ElementRef,
} from '@angular/core';
import {
  DtProgressChange,
  HasProgressValues,
  mixinHasProgress
} from '../progress-base/progress-base';
import { mixinColor, CanColor } from '@dynatrace/angular-components/core';

/** Circumference for the path data in the html file - this does not change unless the path is changed */
const CIRCLE_CIRCUMFERENCE = 328;

export type DtProgressCircleChange = DtProgressChange;

export class DtProgressCircleBase {
  constructor(public _elementRef: ElementRef) { }
}

export const _DtProgressCircle = mixinHasProgress(mixinColor(DtProgressCircleBase, 'main'));

@Component({
  moduleId: module.id,
  selector: 'dt-progress-circle',
  templateUrl: 'progress-circle.html',
  styleUrls: ['progress-circle.scss'],
  exportAs: 'dtProgressCircle',
  host: {
    'class': 'dt-progress-circle',
    'role': 'progressbar',
    '[attr.aria-valuemin]': 'min',
    '[attr.aria-valuemax]': 'max',
    '[attr.aria-valuenow]': 'value',
  },
  inputs: ['color', 'value', 'min', 'max'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class DtProgressCircle extends _DtProgressCircle implements CanColor, HasProgressValues {

  @Output()
  readonly valueChange = new EventEmitter<DtProgressCircleChange>();

  /** Dash offset base on the values percentage */
  _dashOffset: number = CIRCLE_CIRCUMFERENCE;

  constructor(private _changeDetectorRef: ChangeDetectorRef, public _elementRef: ElementRef) {
    super(_elementRef);
  }

  /** Updates all view parameters */
  _updateValues(): void {
    super._updateValues();
    this._dashOffset = this._calculateDashOffset(this.percent);

    // Since this also modifies the percentage and dashOffset,
    // we need to let the change detection know.
    this._changeDetectorRef.markForCheck();
  }

  /** Calculates the dash offset of the progress circle based on the calculated percent */
  private _calculateDashOffset(percent: number): number {
    // tslint:disable-next-line: no-magic-numbers
    return CIRCLE_CIRCUMFERENCE - (CIRCLE_CIRCUMFERENCE / 100 * percent);
  }

  _emitValueChangeEvent(oldValue: number, newValue: number): void {
    this.valueChange.emit({oldValue, newValue});
  }
}
