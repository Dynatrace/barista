import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `<div>
  <dt-alert severity="error" #alert1>This is a message!</dt-alert>
</div>
<button dt-button (click)="alert1.severity='warning'">Set Warning</button>
<button dt-button (click)="alert1.severity='error'">Set Error</button>
<button dt-button (click)="alert1.severity=undefined">Set undefined</button>
  `,
})
@OriginalClassName('InteractiveAlertExampleComponent')
export class InteractiveAlertExampleComponent {
}
