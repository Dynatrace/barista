// tslint:disable no-lifecycle-call no-use-before-declare no-magic-numbers
// tslint:disable no-any max-file-line-count no-unbound-method use-component-selector

import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, Provider, Type } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  DtChartModule,
  DtIconModule,
  DtThemingModule,
} from '@dynatrace/angular-components';
import { Subject } from 'rxjs';
import { dispatchMouseEvent } from '../../../testing/dispatch-events';
import { ARIA_DEFAULT_CLOSE_LABEL } from '../range/constants';
import { DtChartRange } from '../range/range';
import * as streams from './streams';

describe('DtChart Selection Area', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function createComponent<T>(
    component: Type<T>,
    providers: Provider[] = [],
  ): any {
    TestBed.configureTestingModule({
      imports: [
        DtChartModule,
        DtThemingModule,
        DtIconModule.forRoot({ svgIconLocation: `{{name}}.svg` }),
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [TestChart, TestChartComponent],
      providers,
    });

    TestBed.compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();

    return TestBed.createComponent<T>(component);
  }

  afterEach(inject(
    [OverlayContainer],
    (currentOverlayContainer: OverlayContainer) => {
      // Since we're resetting the testing module in some of the tests,
      // we can potentially have multiple overlay containers.
      currentOverlayContainer.ngOnDestroy();
      overlayContainer.ngOnDestroy();
    },
  ));

  describe('range and timestamp available', () => {
    let fixture: ComponentFixture<TestChart>;

    beforeEach(() => {
      fixture = createComponent(TestChart);
    });

    it('should not have a selection area if there is no timestamp or range inside the chart', () => {
      const selectionArea = fixture.debugElement.query(
        By.css('.dt-chart-selection-area'),
      );

      expect(selectionArea).toBeNull();
    });

    it('should have a timestamp inside the chart selection area', () => {
      fixture.componentInstance.hasTimestamp = true;
      fixture.detectChanges();
      const selectionArea = fixture.debugElement.query(
        By.css('.dt-chart-selection-area'),
      );
      const timestamp = fixture.debugElement.query(
        By.css('.dt-chart-timestamp'),
      );

      expect(selectionArea).not.toBeNull();
      expect(timestamp).not.toBeNull();
    });

    it('should have a range inside the chart selection area', () => {
      fixture.componentInstance.hasRange = true;
      fixture.detectChanges();
      const selectionArea = fixture.debugElement.query(
        By.css('.dt-chart-selection-area'),
      );
      const range = fixture.debugElement.query(By.css('.dt-chart-range'));

      expect(selectionArea).not.toBeNull();
      expect(range).not.toBeNull();
    });
  });

  describe('hairline', () => {
    let fixture: ComponentFixture<TestChartComponent>;
    let hairline: DebugElement;
    let plotBackground: Element;

    const fakedMouseOut$ = new Subject<any>();

    beforeEach(() => {
      spyOn(streams, 'getMouseOutStream').and.returnValue(fakedMouseOut$);

      fixture = createComponent(TestChartComponent);
      fixture.detectChanges();

      hairline = fixture.debugElement.query(By.css('.dt-chart-hairline'));
      plotBackground = fixture.debugElement.nativeElement.querySelector(
        '.highcharts-plot-background',
      );
    });

    it('should have a hairline that should be visible on mousemove', () => {
      expect(hairline.nativeElement).toBeDefined();
      // initial display none is from styles
      expect(getComputedStyle(hairline.nativeElement).display).toBe('none');

      // dispatch mousemove on plotBackground
      dispatchMouseEvent(plotBackground, 'mousemove', 100, 100);

      expect(hairline.styles.display).toBe('inherit');
      expect(hairline.styles.transform).toMatch(/translateX\(.+px\)/);
    });

    it('should hide the hairline on mouseout', () => {
      expect(getComputedStyle(hairline.nativeElement).display).toBe('none');

      dispatchMouseEvent(plotBackground, 'mousemove', 50, 50);
      // mouse move over the bounding client rect.
      expect(hairline.styles.display).toBe('inherit');

      fakedMouseOut$.next({ x: 100, y: 100 });
      // now outside the mocked area of the bounding client rect.
      expect(hairline.styles.display).toBe('none');
    });
  });

  describe('accessibilty', () => {
    let fixture: ComponentFixture<TestChart>;

    beforeEach(() => {
      fixture = createComponent(TestChart);
    });

    describe('range', () => {
      let range: DtChartRange;

      beforeEach(() => {
        fixture.componentInstance.hasRange = true;
        fixture.detectChanges();
        range = fixture.debugElement.query(By.css('.dt-chart-range'))
          .componentInstance;
        const start = new Date('2019/06/01 20:40:00').getTime();
        const end = new Date('2019/06/01 20:55:00').getTime();
        range.value = [start, end];
        fixture.detectChanges();
      });

      it('should have a default aria label on the overlay close button', () => {
        const container = overlayContainerElement.querySelector(
          '.dt-chart-selection-area-overlay .dt-icon-button',
        ) as HTMLElement;

        expect(container.getAttribute('aria-label')).toBe(
          ARIA_DEFAULT_CLOSE_LABEL,
        );
      });

      it('should not have been focused on programmatic creation', () => {
        const rangeContainer = fixture.debugElement.query(
          By.css('.dt-chart-range-container'),
        );
        expect(document.activeElement).not.toEqual(
          rangeContainer.nativeElement,
        );
      });

      it('should focused on programmatic focus call', () => {
        range.focus();
        const rangeContainer = fixture.debugElement.query(
          By.css('.dt-chart-range-container'),
        );
        expect(document.activeElement).toEqual(rangeContainer.nativeElement);
      });

      it('should be in a focus trap after the chart range container was focused', () => {
        range.focus();
        const rangeContainer = fixture.debugElement.query(
          By.css('.dt-chart-range-container'),
        );

        const next = rangeContainer.nativeElement.nextSibling;
        const prev = rangeContainer.nativeElement.previousSibling;

        expect(prev.classList.contains('cdk-focus-trap-anchor')).toBe(true);
        expect(prev.getAttribute('tabindex')).toBe('0');

        expect(next.classList.contains('cdk-focus-trap-anchor')).toBe(true);
        expect(next.getAttribute('tabindex')).toBe('0');
      });
    });
  });
});

@Component({
  selector: 'test-chart-without-selection-area',
  template: `
    <dt-chart [options]="options" [series]="series">
      <dt-chart-range *ngIf="hasRange"></dt-chart-range>
      <dt-chart-timestamp *ngIf="hasTimestamp"></dt-chart-timestamp>
    </dt-chart>
  `,
})
export class TestChart {
  options = OPTIONS;
  series = SERIES;

  hasRange = false;
  hasTimestamp = false;
}

@Component({
  selector: 'test-chart',
  template: `
    <dt-chart [options]="options" [series]="series">
      <dt-chart-timestamp></dt-chart-timestamp>
      <dt-chart-range
        value="[1370304002000, 1370304005000]"
        aria-label-close="CLOSE"
      ></dt-chart-range>
    </dt-chart>
  `,
})
export class TestChartComponent {
  options = OPTIONS;
  series = SERIES;
}

const OPTIONS: Highcharts.Options = {
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
};

const SERIES: Highcharts.IndividualSeriesOptions[] = [
  {
    name: 'Requests',
    type: 'column',
    yAxis: 1,
    data: generateData(
      40,
      0,
      250,
      new Date('2019/06/01 20:38:00').getTime(),
      900000,
    ),
  },
];

function randomize(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateData(
  amount: number,
  min: number,
  max: number,
  timestampStart: number,
  timestampTick: number,
): Array<[number, number]> {
  return Array.from(Array(amount).keys()).map(
    v =>
      [timestampStart + timestampTick * v, randomize(min, max)] as [
        number,
        number,
      ],
  );
}
