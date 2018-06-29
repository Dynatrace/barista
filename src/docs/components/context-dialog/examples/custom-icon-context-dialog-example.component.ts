import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
  <button dt-icon-button [dtContextDialogTrigger]="dialog"><dt-icon name="agent"></dt-icon></button>
  <dt-context-dialog #dialog>
  <p>Your dashboard "real user monitoring"<br> is only visible to you</p>
  </dt-context-dialog>
   `,
})
@OriginalClassName('CustomIconContextDialogExampleComponent')
export class CustomIconContextDialogExampleComponent {
}
