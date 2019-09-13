// tslint:disable no-magic-numbers no-any max-file-line-count
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DtChartSeriesVisibilityChangeEvent } from '@dynatrace/angular-components/chart';

import { chartOptions } from './chart-options';
import { dataBig, dataSmall } from './data-service';

@Component({
  selector: 'chart-dev-app-demo',
  templateUrl: './chart-demo.component.html',
  styleUrls: ['./chart-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartDemo {
  validRange = false;
  options = chartOptions;
  series = dataSmall;

  dataSet = 'small';

  onTimeframeValidChanges(valid: boolean): void {
    this.validRange = valid;
  }

  switchData(): void {
    if (this.dataSet === 'small') {
      this.series = dataBig;
      this.dataSet = 'large';
      return;
    }
    this.series = dataSmall;
    this.dataSet = 'small';
  }

  onTimeframeApply(): void {
    console.log('do something');
  }

  closed(): void {
    console.log('selection area closed');
  }

  seriesVisibilityChanged(event: DtChartSeriesVisibilityChangeEvent): void {
    console.log(event);
  }
}
