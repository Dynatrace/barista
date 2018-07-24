
import {ComponentFixture, TestBed, fakeAsync, inject, flush, tick} from '@angular/core/testing';
import {Component} from '@angular/core';
import { DtToastModule, DtToast, DT_TOAST_FADE_TIME} from '@dynatrace/angular-components';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

describe('DtToast', () => {
  let dtToast: DtToast;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  let fixture: ComponentFixture<TestComponent>;

  const simpleMessage = 'Your changes have been saved!';

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [DtToastModule, NoopAnimationsModule],
      declarations: [TestComponent],
    }).compileComponents();
  }));

  beforeEach(inject([DtToast, OverlayContainer], (toast: DtToast, oc: OverlayContainer) => {
    dtToast = toast;
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    fixture.detectChanges();

  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should have the role of alert', () => {
    dtToast.create(simpleMessage);

    const containerElement = overlayContainerElement.querySelector('.dt-toast-container')!;
    expect(containerElement.getAttribute('role'))
        .toBe('alert', 'Expected toast container to have role="alert"');
   });

  it('should open a simple message', () => {
    dtToast.create(simpleMessage);

    fixture.detectChanges();

    const messageElement = overlayContainerElement.querySelector('.dt-toast-container')!;
    expect(messageElement.textContent)
        .toContain(simpleMessage, `Expected the toast message to be '${simpleMessage}'`);
  });

  it('should dismiss the toast and remove itself from the view', fakeAsync(() => {
    const dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');

    const toastRef = dtToast.create(simpleMessage);
    fixture.detectChanges();
    expect(overlayContainerElement.childElementCount)
        .toBeGreaterThan(0, 'Expected overlay container element to have at least one child');

    toastRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);

    toastRef.dismiss();
    fixture.detectChanges();
    flush();

    expect(dismissCompleteSpy).toHaveBeenCalled();
    expect(overlayContainerElement.childElementCount)
        .toBe(0, 'Expected the overlay container element to have no child elements');
  }));

  it('should be able to get dismissed through the service', fakeAsync(() => {
    dtToast.create(simpleMessage);
    fixture.detectChanges();
    expect(overlayContainerElement.childElementCount).toBeGreaterThan(0);

    dtToast.dismiss();
    fixture.detectChanges();
    flush();

    expect(overlayContainerElement.childElementCount).toBe(0);
  }));

  it('should set the animation state to enter on entry', () => {
    const toastRef = dtToast.create(simpleMessage);

    fixture.detectChanges();
    expect(toastRef.containerInstance._animationState)
        .toBe('enter', `Expected the animation state would be 'enter'.`);
    toastRef.dismiss();

    fixture.detectChanges();
    expect(toastRef.containerInstance._animationState)
        .toBe('exit', `Expected the animation state would be 'exit'.`);
  });

  it('should set the animation state to complete on exit', () => {
    const toastRef = dtToast.create(simpleMessage);
    toastRef.dismiss();

    fixture.detectChanges();
    expect(toastRef.containerInstance._animationState)
        .toBe('exit', `Expected the animation state would be 'exit'.`);
  });

  it(
    `should set the old toast animation state to exit and the new toast animation
      state to enter on entry of new toast`,
    fakeAsync(() => {
      const toastRef = dtToast.create(simpleMessage);
      const dismissCompleteSpy = jasmine.createSpy('dismiss complete spy');

      fixture.detectChanges();
      expect(toastRef.containerInstance._animationState)
          .toBe('enter', `Expected the animation state would be 'enter'.`);

      const toastRef2 = dtToast.create(simpleMessage);

      fixture.detectChanges();
      toastRef.afterDismissed().subscribe(undefined, undefined, dismissCompleteSpy);
      tick(DT_TOAST_FADE_TIME);
      expect(toastRef2.containerInstance._animationState)
          .toBe('enter', `Expected the animation state of the new toast to be 'enter'.`);

      expect(dismissCompleteSpy).toHaveBeenCalled();
      expect(toastRef.containerInstance._animationState)
          .toBe('exit', `Expected the animation state would be 'exit'.`);
      flush();
    }));

  it('should open a new toast after dismissing a previous toast', fakeAsync(() => {
    let toastRef = dtToast.create(simpleMessage);

    fixture.detectChanges();

    toastRef.dismiss();
    fixture.detectChanges();

    // Wait for the toast dismiss animation to finish.
    flush();
    toastRef = dtToast.create(simpleMessage);
    fixture.detectChanges();

    // Wait for the toast open animation to finish.
    tick(DT_TOAST_FADE_TIME);
    expect(toastRef.containerInstance._animationState)
    .toBe('enter', `Expected the animation state to be 'enter'.`);
    flush();
  }));

  it('should remove past toasts when opening new toasts', fakeAsync(() => {
    dtToast.create('First toast');
    fixture.detectChanges();

    dtToast.create('Second toast');
    fixture.detectChanges();
    flush();

    dtToast.create('Third toast');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent!.trim()).toBe('Third toast');
    flush();
  }));

  it('should remove toast if another is shown while its still animating open', fakeAsync(() => {
    dtToast.create('First toast');
    fixture.detectChanges();

    dtToast.create('Second toast');
    fixture.detectChanges();

    tick();
    expect(overlayContainerElement.textContent!.trim()).toBe('Second toast');

    // Let remaining animations run.
    flush();
  }));

  it('should dismiss automatically after a specified timeout', fakeAsync(() => {
    const toastRef = dtToast.create('short');
    const afterDismissSpy = jasmine.createSpy('after dismiss spy');
    toastRef.afterDismissed().subscribe(afterDismissSpy);

    fixture.detectChanges();
    tick();
    expect(afterDismissSpy).not.toHaveBeenCalled();

    /** wait longer then the duration */
    tick(toastRef.duration * 2);
    fixture.detectChanges();
    tick();
    expect(afterDismissSpy).toHaveBeenCalled();
  }));

  it('should clear the dismiss timeout when dismissed before timeout expiration', fakeAsync(() => {
    const toastRef = dtToast.create('content message is very long and takes a long time');

    setTimeout(() => dtToast.dismiss(), toastRef.duration / 2);

    tick(toastRef.duration);
    fixture.detectChanges();
    tick();

    expect(fixture.isStable()).toBe(true);
  }));
});

/** dummy component */
@Component({
  selector: 'dt-test-component',
  template: '',
})
class TestComponent {
}
