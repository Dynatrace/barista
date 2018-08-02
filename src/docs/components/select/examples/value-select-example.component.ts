import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
    <p>Selected Value: <i>{{selectedValue || 'No value selected'}}</i></p>
    <dt-select placeholder="Choose your coffee" [(value)]="selectedValue">
      <dt-option value="ThePerfectPour">ThePerfectPour</dt-option>
      <dt-option value="Affogato">Affogato</dt-option>
      <dt-option value="Americano">Americano</dt-option>
    </dt-select>
  `,
})
@OriginalClassName('ValueSelectExampleComponent')
export class ValueSelectExampleComponent {
  selectedValue: string;
}
