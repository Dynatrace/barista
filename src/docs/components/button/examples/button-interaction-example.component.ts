import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
    <button dt-button (click)="counter = counter + 1 ">Increase Counter</button>
    <p>Counter: {{counter}}</p>
  `,
})
@OriginalClassName('InteractionButtonExampleComponent')
export class InteractionButtonExampleComponent {
  counter = 0;
}
