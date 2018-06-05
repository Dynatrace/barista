import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {DtContextDialog} from '@dynatrace/angular-components/context-dialog/context-dialog';
import {CdkOverlayOrigin} from '@angular/cdk/overlay';

@Directive({
  selector: 'button[dtContextDialogTrigger]',
  exportAs: 'dtContextDialogTrigger',
  host: {
    'class': 'dt-context-dialog-trigger',
    '(click)': 'dialog && dialog.open()',
  },
})
export class DtContextDialogTrigger extends CdkOverlayOrigin implements OnDestroy {

  private _dialog: DtContextDialog | undefined;

  @Input('dtContextDialogTrigger')
  get dialog(): DtContextDialog | undefined { return this._dialog; }
  set dialog(value: DtContextDialog | undefined) {
    if (value !== this._dialog) {
      this._unregisterFromDialog();
      if (value) {
        value._registerTrigger(this);
      }
      this._dialog = value;
    }
  }

  @Output() readonly openChange = new EventEmitter<void>();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnDestroy(): void {
    this._unregisterFromDialog();
  }

  _unregisterFromDialog(): void {
    if (this._dialog) {
      this._dialog._unregisterTrigger(this);
      this._dialog = undefined;
    }
  }
}
