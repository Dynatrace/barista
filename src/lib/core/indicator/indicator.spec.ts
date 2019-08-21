// tslint:disable no-lifecycle-call no-use-before-declare no-magic-numbers
// tslint:disable no-any max-file-line-count no-unbound-method use-component-selector

import { Component, ViewChild } from '@angular/core';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  DtIndicator,
  DtIndicatorModule,
} from '@dynatrace/angular-components/core';

describe('DtIndicator without table', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [DtIndicatorModule],
      declarations: [
        DtIndicatorBasic,
        DtIndicatorWithActive,
        DtIndicatorColor,
        DtIndicatorWarning,
      ],
    });

    TestBed.compileComponents();
  }));

  it('should add the dt-indicator-active class by default', () => {
    const fixture = TestBed.createComponent(DtIndicatorBasic);
    fixture.detectChanges();

    const indicator: HTMLSpanElement = fixture.debugElement.query(
      By.css('.dt-indicator'),
    ).nativeElement;

    expect(indicator.classList.contains('dt-indicator')).toBe(true);
    expect(indicator.classList.contains('dt-indicator-active')).toBe(true);
  });

  it('should be able to set the active state', () => {
    const fixture = TestBed.createComponent(DtIndicatorWithActive);
    fixture.detectChanges();

    const indicator: HTMLSpanElement = fixture.debugElement.query(
      By.css('.dt-indicator'),
    ).nativeElement;

    expect(indicator.classList.contains('dt-indicator-active')).toBe(false);

    fixture.componentInstance.active = true;
    fixture.detectChanges();
    expect(indicator.classList.contains('dt-indicator-active')).toBe(true);
  });

  it('should set the color to warning', () => {
    const fixture = TestBed.createComponent(DtIndicatorWarning);
    fixture.detectChanges();

    const indicator: HTMLSpanElement = fixture.debugElement.query(
      By.css('.dt-indicator'),
    ).nativeElement;

    expect(indicator.classList.contains('dt-indicator-active')).toBe(true);
    expect(indicator.classList.contains('dt-color-warning')).toBe(true);
  });

  it('should set the color on a binding', () => {
    const fixture = TestBed.createComponent(DtIndicatorColor);
    fixture.detectChanges();

    const indicator: HTMLSpanElement = fixture.debugElement.query(
      By.css('.dt-indicator'),
    ).nativeElement;

    expect(indicator.classList.contains('dt-indicator-active')).toBe(true);
    expect(indicator.classList.contains('dt-color-warning')).toBe(true);
    expect(indicator.classList.contains('dt-color-error')).toBe(false);

    fixture.componentInstance.color = 'error';
    fixture.detectChanges();

    expect(indicator.classList.contains('dt-color-error')).toBe(true);
    expect(indicator.classList.contains('dt-color-warning')).toBe(false);
  });

  it('should complete the `stateChanges` stream for the dtIndicator on destroy', () => {
    const fixture = TestBed.createComponent(DtIndicatorBasic);
    fixture.detectChanges();

    const indicator = fixture.componentInstance.indicator;
    const completeSpy = jest.fn();
    const subscription = indicator._stateChanges.subscribe(
      () => {},
      () => {},
      completeSpy,
    );

    fixture.destroy();
    expect(completeSpy).toHaveBeenCalled();
    subscription.unsubscribe();
  });
});

@Component({
  template: `
    <span dtIndicator></span>
  `,
})
class DtIndicatorBasic {
  @ViewChild(DtIndicator, { static: false }) indicator: DtIndicator;
}

@Component({
  template: `
    <span [dtIndicator]="active"></span>
  `,
})
class DtIndicatorWithActive {
  active = false;
}

@Component({
  template: `
    <span dtIndicator dtIndicatorColor="warning"></span>
  `,
})
class DtIndicatorWarning {}

@Component({
  template: `
    <span dtIndicator [dtIndicatorColor]="color"></span>
  `,
})
class DtIndicatorColor {
  color = 'warning';
}
