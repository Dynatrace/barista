import { Component, ViewChild } from '@angular/core';
import { DtButton, DtContextDialog } from '@dynatrace/angular-components';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
  <button dt-button variant="secondary" (click)="open()" #focusme>Open</button>
  <dt-context-dialog #contextdialog color="cta">
  <p>Close me to return the focus to the "Open" button</p>
  <button dt-button variant="secondary">Focused</button>
  </dt-context-dialog>`,
})
@OriginalClassName('PrevFocusContextDialogExampleComponent')
export class PrevFocusContextDialogExampleComponent {
  @ViewChild('focusme') focusMe: DtButton;
  @ViewChild('contextdialog') contextdialog: DtContextDialog;

  open(): void {
    this.contextdialog.open();
  }
}
