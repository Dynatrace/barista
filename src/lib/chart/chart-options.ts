import { DtChartOptions } from './chart';
import { Colors } from '../theming/colors';
import { AxisOptions } from 'highcharts';

// tslint:disable:no-magic-numbers
/** Custom highcharts easing function */
const DT_EASEINOUT = (pos: number): number => {
  if (pos === 0) {
    return 0;
  }
  if (pos === 1) {
    return 1;
  }
  if (pos * 2 < 1) {
    return Math.pow(2, (pos * 2 - 1) * 10) * 0.5;
  }
  return (-Math.pow(2, (pos * 2 - 1) * -10) * 0.5 + 2);
};
// tslint:enable:no-magic-numbers

export const DEFAULT_CHART_OPTIONS: DtChartOptions = {
  chart: {
    style: {
      fontFamily: 'BerninaSansWeb',
    },
    height: 230,
    plotBorderColor: Colors.GRAY_300,
    plotBorderWidth: 1,
    spacingBottom: 12,
    spacingTop: 12,
    animation: false,
  },
  plotOptions: {
    series: {
      animation: {
        duration: 1000,
        // tslint:disable-next-line:no-any
        easing: DT_EASEINOUT as any, // As any to bypass highcharts types
      },
    },
  },
  title: {
    text: null,
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    useHTML: true,
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadow: false,
  },
  legend: {
    itemStyle: {
      fontWeight: 'normal',
      fontSize: '12px',
      color: Colors.GRAY_700,
    },
    itemHoverStyle: {
      color: Colors.GRAY_900,
    },
    itemHiddenStyle: {
      color: Colors.GRAY_300,
    },
  },
};

export const DEFAULT_CHART_AXIS_STYLES: AxisOptions = {
  labels: {
    style: {
      fontSize: '12px',
    },
  },
  tickWidth: 1,
  tickLength: 4,
};
