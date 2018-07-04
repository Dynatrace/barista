import {mixinHasProgress, HasProgressValues} from './progress';

describe('MixinProgress', () => {
  it('should augment an existing class with a progress property', () => {
    class EmptyClass { }

    const classWithProgress = mixinHasProgress(EmptyClass);
    const instance = new classWithProgress();

    expect(instance.value)
        .toBe(0, 'Expected default value of the property');
  });

  it('should calculate percentage', () => {
    class EmptyClass { }

    const classWithProgress = mixinHasProgress(EmptyClass);
    const instance = new classWithProgress();

    instance.value = 50;

    expect(instance.percent).toBe(50);

    instance.max = 500;

    expect(instance.percent).toBe(10);
  });

  it('should clamp values', () => {
    class EmptyClass { }

    const classWithProgress = mixinHasProgress(EmptyClass);
    const instance = new classWithProgress();

    instance.value = 50;
    instance.value = 200;

    expect(instance.percent).toBe(100);

    expect(instance.value).toBe(100);
  });

  it('should fire event', () => {
    class EmptyClass { }

    const classWithProgress = mixinHasProgress(EmptyClass);
    class EmptyClassImpl extends classWithProgress implements HasProgressValues {
      eventCounter = 0;

      _emitValueChangeEvent(oldValue: number, newValue: number): void {
        this.eventCounter++;
      }
    }

    const instance = new EmptyClassImpl();

    expect(instance.eventCounter).toBe(0);

    instance.value = 50;
    expect(instance.eventCounter).toBe(1);

    instance.value = 200;
    expect(instance.eventCounter).toBe(2);

    instance.value = 200;
    expect(instance.eventCounter).toBe(2); // still 2
  });

});
