import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
    <input dtInput
      required
      placeholder="Enter Text"
      [(ngModel)]="textValue"
      #textControl="ngModel" />
    <p>Output: <em>{{textValue || 'none'}}</em></p>
    <!-- The lines below are just for the showcase, do not use this in production -->
    <p>
      Touched: {{ textControl.touched }}<br />
      Dirty: {{ textControl.dirty }}<br />
      Status: {{ textControl.control?.status }}<br />
    </p>
  `,
})
@OriginalClassName('NgModelInputExample')
export class NgModelInputExample {
  textValue = '';
}
