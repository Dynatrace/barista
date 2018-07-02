import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
  <div dtTheme=":dark" class="dark">
    <dt-checkbox checked>Check me</dt-checkbox>
    <dt-checkbox [indeterminate]="true">Indeterminate</dt-checkbox>
    <dt-checkbox disabled checked>Disabled</dt-checkbox>
  </div>
  `,
  styles: [`
    dt-checkbox {
      display: block;
    }
    dt-checkbox + dt-checkbox {
      margin-top: 20px;
    }
  `],
})
@OriginalClassName('DarkCheckboxExample')
export class DarkCheckboxExample { }
