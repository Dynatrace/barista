import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Optional,
  Output,
  SkipSelf,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AxisOptions, DataPoint, Options} from 'highcharts';
import {DtChart, DtChartOptions, DtChartSeries} from '../chart';
import {
  _DT_MICROCHART_COLUMN_MINMAX_DATAPOINT_OPTIONS,
  _DT_MICROCHART_DEFAULT_OPTIONS,
  _DT_MICROCHART_LINE_MAX_DATAPOINT_OPTIONS,
  _DT_MICROCHART_LINE_MIN_DATAPOINT_OPTIONS,
  _DT_MICROCHART_MINMAX_DATAPOINT_OPTIONS
} from './micro-chart-options';
import { merge } from 'lodash';
import { DtTheme } from '@dynatrace/angular-components/theming';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { colorizeOptions, getPalette } from '@dynatrace/angular-components/chart/microchart/dt-micro-chart-colorizer';

const SUPPORTED_CHART_TYPES = ['line', 'column'];

@Component({
  moduleId: module.id,
  selector: 'dt-micro-chart',
  template: '<dt-chart (updated)="updated.emit()"></dt-chart>',
  exportAs: 'dtMicroChart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
})
export class DtMicroChart implements OnDestroy {
  @ViewChild(forwardRef(() => DtChart)) private _dtChart: DtChart;

  private _series: Observable<DtChartSeries> | DtChartSeries | undefined;
  private _themeStateChangeSub = Subscription.EMPTY;
  private _options: DtChartOptions;

  private _columnSeries: boolean;
  private _minDataPoint: DataPoint;
  private _maxDataPoint: DataPoint;

  @Input()
  set options(options: DtChartOptions) {
    checkUnsupportedOptions(options);
    this._options = merge({}, _DT_MICROCHART_DEFAULT_OPTIONS, options);
    transformAxis(this._options);
    colorizeOptions(this._options, this._theme);
    this._dtChart.options = this._options;
  }

  get options(): DtChartOptions {
    return this._dtChart.options;
  }
  @Input()
  set series(series: Observable<DtChartSeries> | DtChartSeries | undefined) {
    let transformed: Observable<DtChartSeries[]> | DtChartSeries[] | undefined;

    if (series instanceof Observable) {
      transformed = series.pipe(map((s) => this._transformSeries(s)));
    } else if (series !== undefined) {
      transformed = this._transformSeries(series);
    }

    this._series = series;
    this._dtChart.series = transformed;
    }

  get series(): Observable<DtChartSeries> | DtChartSeries | undefined {
    return this._series;
  }
  @Output() readonly updated: EventEmitter<void> = new EventEmitter<void>();

  get seriesIds(): Array<string | undefined> | undefined {
    return this._dtChart.seriesIds;
  }

  get highchartsOptions(): Options {
    return this._dtChart.highchartsOptions;
  }

  constructor(@Optional() @SkipSelf() private readonly _theme: DtTheme) {
    if (this._theme) {
      this._themeStateChangeSub = this._theme._stateChanges.subscribe(() => {
        if (this._options) {
          colorizeOptions(this._options, this._theme);
          this._colorizeMinMaxDataPoints();
          this._dtChart.options = merge({}, this._options);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._themeStateChangeSub.unsubscribe();
  }

  private _transformSeries(series: DtChartSeries): DtChartSeries[] {
    // We only support one series. This has already been checked.
    if (!series.data) {
      return [series];
    }

    this._columnSeries =
      series.type === 'column' || this.highchartsOptions.chart !== undefined && this.highchartsOptions.chart.type === 'column';

    const dataPoints = normalizeData(series.data);
    const values = dataPoints.map((point: DataPoint) => point.y) as number[];

    const minIndex = values.lastIndexOf(Math.min(...values));
    const maxIndex = values.lastIndexOf(Math.max(...values));

    this._minDataPoint = dataPoints[minIndex];
    this._maxDataPoint = dataPoints[maxIndex];

    this._decorateMinMaxDataPoints();

    series.data = dataPoints;
    return [series];
  }

  private _decorateMinMaxDataPoints(): void {
    if (this._columnSeries) {
      merge(this._minDataPoint, _DT_MICROCHART_MINMAX_DATAPOINT_OPTIONS, _DT_MICROCHART_COLUMN_MINMAX_DATAPOINT_OPTIONS);
      merge(this._maxDataPoint, _DT_MICROCHART_MINMAX_DATAPOINT_OPTIONS, _DT_MICROCHART_COLUMN_MINMAX_DATAPOINT_OPTIONS);
    } else {
      merge(this._minDataPoint, _DT_MICROCHART_MINMAX_DATAPOINT_OPTIONS, _DT_MICROCHART_LINE_MIN_DATAPOINT_OPTIONS);
      merge(this._maxDataPoint, _DT_MICROCHART_MINMAX_DATAPOINT_OPTIONS, _DT_MICROCHART_LINE_MAX_DATAPOINT_OPTIONS);
    }

    this._colorizeMinMaxDataPoints();
  }

  private _colorizeMinMaxDataPoints(): void {
    const palette = getPalette(this._theme);
    if (this._columnSeries) {
      merge(this._minDataPoint, { borderColor: palette.secondary });
      merge(this._maxDataPoint, { borderColor: palette.secondary });
    } else {
      const options: DataPoint = {
        marker: {
          lineColor: palette.secondary,
          states: {
            hover: {
              lineColor: palette.secondary,
              fillColor: palette.tertiary,
            },
          },
        },
      };
      merge(this._minDataPoint, options);
      merge(this._maxDataPoint, options);
    }
  }
}

/* Merges the passed options into all defined axis */
function transformAxis(options: DtChartOptions): void {
  if (options.xAxis) {
    mergeAxis(options.xAxis);
  }

  if (options.yAxis) {
    mergeAxis(options.yAxis);
  }
}

function mergeAxis(options: AxisOptions | AxisOptions[]): void {
  if (!options) {
    return;
  }
  if (Array.isArray(options)) {
    options.forEach((a) => {
      merge(a, {visible: false});
    });
  } else {
    merge(options, {visible: false});
  }
}

/**
 * Converts a series to {@link DataPoint[]}
 */
function normalizeData(seriesData: Array<number | [number, number] | [string, number] | DataPoint>): DataPoint[] {
  if (seriesData.length === 0) {
    return [];
  }

  // Convert (number | [number, number] | [string, number]) to DataPoint
  // In case of another data structure we can ignore it, since an error should already be thrown for unsupported charts.
  const firstDataValue = seriesData[0];

  if (typeof firstDataValue === 'number') {
    return (seriesData as number[])
      .map((value: number, index: number) => ({x: index, y: value}));

  } else if (Array.isArray(firstDataValue)) {
    const numberArraySeries = seriesData as Array<[number, number]>;
    return numberArraySeries.map((value: [number, number]) => ({x: value[0], y: value[1]}));

  } else if ('y' in firstDataValue) {
    return seriesData as DataPoint[];
  }

  return [];
}

function checkUnsupportedType(type: string | undefined): void {
  if (type && SUPPORTED_CHART_TYPES.indexOf(type) === -1) {
    throw getDtMicroChartUnsupportedChartTypeError(type);
  }
}

function checkUnsupportedOptions(options: DtChartOptions): void {
  if (options.chart) {
    checkUnsupportedType(options.chart.type);
  }
}

function getDtMicroChartUnsupportedChartTypeError(type: string): Error {
  return Error(`Series type unsupported: ${type}`);
}
