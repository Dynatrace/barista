// tslint:disable:no-magic-numbers

import { Component } from '@angular/core';

import {
  DtChartOptions,
  DtChartSeries,
} from '@dynatrace/barista-components/chart';

import { generateData } from './data';

@Component({
  selector: 'barista-demo',
  template: `
    <dt-micro-chart [options]="options" [series]="series">
      <dt-chart-tooltip>
        <ng-template let-tooltip>
          {{ tooltip.y | dtCount }}
        </ng-template>
      </dt-chart-tooltip>
    </dt-micro-chart>
  `,
})
export class MicroChartColumnsExample {
  options: DtChartOptions = {
    chart: {
      type: 'column',
    },
  };

  series: DtChartSeries = {
    name: 'Requests',
    data: generateData(40, 200000, 300000, 1370304000000, 900000),
  };
}
