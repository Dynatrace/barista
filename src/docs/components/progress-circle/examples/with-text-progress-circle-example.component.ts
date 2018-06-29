import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  template: `
  <dt-progress-circle [value]="value" [max]="max">
  {{value}}/{{max}}
  </dt-progress-circle>`,
})
@OriginalClassName('WithTextProgressCircleExampleComponent')
export class WithTextProgressCircleExampleComponent {
  value = 300;
  max = 1500;
}
