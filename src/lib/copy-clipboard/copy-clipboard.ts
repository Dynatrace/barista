import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef,
  ViewChild, ContentChildren, QueryList,
} from '@angular/core';
import {DtInput} from '../input/input';
import {addCssClass, removeCssClass} from '../core/util';
import {timer} from 'rxjs';

const DT_COPY_CLIPBOARD_TIMER = 800;

@Component({
  moduleId: module.id,
  selector: 'dt-copy-clipboard',
  templateUrl: 'copy-clipboard.html',
  styleUrls: ['copy-clipboard.scss'],
  exportAs: 'dtCopyClipboard',
  host: {
    class: 'dt-copy-clipboard',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class DtCopyClipboard {
  constructor(public _cd: ChangeDetectorRef) {
  }

  @Output() copied: EventEmitter<void> = new EventEmitter();
  @ContentChild(DtInput, {read: ElementRef}) input: ElementRef;
  @ContentChild(DtInput) inputComponent: DtInput;
  @ViewChild('copyButton', {read: ElementRef}) copyButtonRef: ElementRef;
  // tslint:disable-next-line:no-unused-variable
  private _showIcon = false;
  get showIcon(): boolean {
    return this._showIcon;
  }

  private _disabled = false;
  get disabled(): boolean {
    return this._disabled;
  }

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    if (this.inputComponent) {
      this.inputComponent.disabled = value;
    }
  }

  copy2Clipboard(): void {
    const dtCopyClipboardSuccessful = 'dt-copy-clipboard-successful';
    if (this._disabled) {
      return; // do nothing if not enabled
    }
    this._showIcon = true;

    if (this.input) {
      addCssClass(this.input.nativeElement, dtCopyClipboardSuccessful);
    }
    if (this.copyButtonRef) {
      addCssClass(this.copyButtonRef.nativeElement, dtCopyClipboardSuccessful);
    }
    timer(DT_COPY_CLIPBOARD_TIMER).subscribe((): void => {
      this._showIcon = false;
      if (this.input) {
        removeCssClass(this.input.nativeElement, dtCopyClipboardSuccessful);
      }
      if (this.copyButtonRef) {
        removeCssClass(this.copyButtonRef.nativeElement, dtCopyClipboardSuccessful);
      }
      this._cd.markForCheck();
    });
    if (this.input) {
      this.input.nativeElement.select();
      document.execCommand('copy');
    }
    /* then */
    this.copied.emit();
  }
}
