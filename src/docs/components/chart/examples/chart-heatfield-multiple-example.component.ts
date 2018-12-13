// tslint:disable:no-magic-numbers

import { Component } from '@angular/core';
import { generateData } from './chart-data-utils';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  template: `
  <dt-chart [options]="options" [series]="series">
    <dt-chart-heatfield [start]="10000" [end]="20000">
      Problem 1:<br/>
      <a class="dt-link">View problem details</a>
    </dt-chart-heatfield>
    <dt-chart-heatfield [start]="40000" [end]="60000" color="main">
      Overload prevention:<br/>
      <a class="dt-link">View overload prevention</a>
    </dt-chart-heatfield>
    <dt-chart-tooltip>
      <ng-template let-tooltip>
        <dt-key-value-list style="min-width: 100px">
          <dt-key-value-list-item *ngFor="let data of tooltip.points" [key]="data.series.name" [value]="data.point.y">
          </dt-key-value-list-item>
        </dt-key-value-list>
      </ng-template>
    </dt-chart-tooltip>
  </dt-chart>`,
})
@OriginalClassName('ChartHeatfieldMultipleExampleComponent')
export class ChartHeatfieldMultipleExampleComponent {
  options: Highcharts.Options = {
    chart: {
      spacingLeft: 100,
      spacingRight: 100,
    },
    xAxis: {
      type: 'datetime',
      min: 0,
      max: 100000,
    },
    yAxis: [
      {
        title: null,
        labels: {
          enabled: false,
        },
        tickLength: 0,
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
  };

  series: Highcharts.IndividualSeriesOptions[] = [
    {
      name: 'Requests',
      type: 'line',
      data: generateData(11, 0, 200, 0, 10000),
    }];
}

// tslint:enable:no-magic-numbers
