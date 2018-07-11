import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
    <button dt-button><dt-icon name="agent"></dt-icon>Primary with icon</button>
    <button dt-button variant="secondary"><dt-icon name="agent"></dt-icon>Secondary with icon</button>
    <button dt-button color="warning"><dt-icon name="agent"></dt-icon>Primary with icon</button>
    <button dt-button color="warning" variant="secondary"><dt-icon name="agent"></dt-icon>Secondary with icon</button>
    <button dt-button color="cta"><dt-icon name="agent"></dt-icon>Primary with icon</button>
    <button dt-button color="cta" variant="secondary"><dt-icon name="agent"></dt-icon>Secondary with icon</button>
  `,
  styles: ['.dt-button + .dt-button { margin-left: 8px; }'],
})
@OriginalClassName('IconsButtonExampleComponent')
export class IconsButtonExampleComponent {}
