import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
  <dt-radio-button value="aberfeldy" name="group">Aberfeldy</dt-radio-button>
  <dt-radio-button value="dalmore" name="group">Dalmore</dt-radio-button>
  `,
  styles: ['dt-radio-button { display: block; } dt-radio-button + dt-radio-button { margin-top: 20px; }'],
})
@OriginalClassName('NameGroupingRadioExample')
export class NameGroupingRadioExample { }
