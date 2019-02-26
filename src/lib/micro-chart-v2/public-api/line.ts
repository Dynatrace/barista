import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnDestroy, OnChanges, AfterViewInit, ContentChild, TemplateRef, ViewChild, AfterContentInit } from '@angular/core';
import { DtMicroChartSeries, DtMicroChartSeriesType, DtMicroChartRenderDataBase, DtMicroChartRenderDataExtremes } from './series';
import { DtMicroChartMinLabel, DtMicroChartMaxLabel } from './extreme-label';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'dt-micro-chart-line-series',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'dtMicroChartLineSeries',
  providers: [{ provide: DtMicroChartSeries, useExisting: DtMicroChartLineSeries }],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DtMicroChartLineSeries extends DtMicroChartSeries implements OnChanges, OnDestroy {
  private _highlightExtremes = false;
  readonly type: DtMicroChartSeriesType = 'line';

  @ContentChild(DtMicroChartMinLabel, { read: TemplateRef }) _minLabelTemplate: TemplateRef<any>;
  @ContentChild(DtMicroChartMaxLabel, { read: TemplateRef }) _maxLabelTemplate: TemplateRef<any>;

  /**
   * Whether the autocomplete is disabled. When disabled, the element will
   * act as a regular input and the user won't be able to open the panel.
   */
  @Input('highlightExtremes')
  get autocompleteDisabled(): boolean { return this._highlightExtremes; }
  set autocompleteDisabled(value: boolean) {
    this._highlightExtremes = coerceBooleanProperty(value);
  }

  get _renderData(): DtMicroChartRenderDataBase & DtMicroChartRenderDataExtremes {
    return {
      publicSeriesId: this._id,
      data: this.data,
      highlightExtremes: this._highlightExtremes,
      _minLabelTemplate: this._minLabelTemplate,
      _maxLabelTemplate: this._maxLabelTemplate,
    };
  }
}
