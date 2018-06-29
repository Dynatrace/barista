// tslint:disable:no-magic-numbers

import { Component } from '@angular/core';
import { Colors } from '@dynatrace/angular-components';
import { generateData } from './chart-data-utils';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  template: '<dt-chart [options]="options" [series]="series"></dt-chart>',
})
@OriginalClassName('ChartDefaultExampleComponent')
export class ChartDefaultExampleComponent {
  options: Highcharts.Options = {
    xAxis: {
      type: 'datetime',
    },
    yAxis: [
      {
        title: null,
        labels: {
          format: '{value}',
        },
        tickInterval: 10,
      },
      {
        title: null,
        labels: {
          format: '{value}/min',
        },
        opposite: true,
        tickInterval: 50,
      },
    ],
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      formatter(): string | boolean {
        return `${this.series.name}&nbsp${this.y}`;
      },
    },
  };

  series: Highcharts.IndividualSeriesOptions[] = [
    {
      name: 'Requests',
      type: 'column',
      color: Colors.ROYALBLUE_200,
      yAxis: 1,
      data: generateData(40, 0, 200, 1370304000000, 900000),
    },
    {
      name: 'Failed requests',
      type: 'column',
      color: Colors.ROYALBLUE_500,
      yAxis: 1,
      data: generateData(40, 0, 15, 1370304000000, 900000),
    },
    {
      name: 'Failure rate',
      type: 'line',
      color: Colors.ROYALBLUE_700,
      data: generateData(40, 0, 20, 1370304000000, 900000),
    }];
}

// tslint:enable:no-magic-numbers
