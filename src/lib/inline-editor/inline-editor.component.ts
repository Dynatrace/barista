import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  forwardRef,
  AfterViewChecked
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

enum MODES {
  IDLE,
  EDITING,
  SAVING,
}

@Component({
  preserveWhitespaces: false,
  selector: '[dt-inline-editor]',
  styleUrls: ['./inline-editor.component.scss'],
  templateUrl: './inline-editor.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DtInlineEditor), multi: true },
  ],
})
export class DtInlineEditor implements ControlValueAccessor, AfterViewChecked, OnDestroy {

  private changed = new Array<(value: string) => void>();
  private touched = new Array<() => void>();
  private initialState: string;
  private mode = MODES.IDLE;
  private modeOnLastCheck = MODES.IDLE;

  private $saving: any;

  @ViewChild('input') inputReference: ElementRef;
  @ViewChild('edit') editButtonReference: ElementRef;

  @Input('onSave') onSaveFunction: (result: { value: string }) => Observable<void>;
  @Output('enterEditing') enterEditingEvent = new EventEmitter<{ value: string }>();
  @Output('quitEditing') quitEditingEvent = new EventEmitter<{ value: string }>();
  @Output('save') saveEvent = new EventEmitter<{ value: string }>();
  @Output('cancel') cancelEvent = new EventEmitter<{ value: string }>();
  @Output('saved') savedEvent = new EventEmitter<{ value: string }>();
  @Output('failed') failedEvent = new EventEmitter<{ value: string, error: any }>();

  ngOnDestroy(): void {
    if (this.$saving) {
      this.$saving.unsubscribe();
      this.$saving = null;
    }
  }

  private onChange(): void {
    this.value = this.inputReference.nativeElement.value;
  }

  ngAfterViewChecked(): void {
    if (this.mode !== this.modeOnLastCheck) {
      this.setFocusToEditControls();
      this.modeOnLastCheck = this.mode;
    }
  }

  private setFocusToEditControls(): void {
    if (this.mode === MODES.EDITING) {
      if (this.inputReference.nativeElement) {
        this.inputReference.nativeElement.focus();
      }
    } else if (this.mode === MODES.IDLE) {
      if (this.editButtonReference.nativeElement) {
        this.editButtonReference.nativeElement.focus();
      }
    }
  }

  // Public API

  enterEditing(): void {
    this.initialState = this.value;
    this.mode = MODES.EDITING;
    this.touch();

    // Better to trigger it where input is shown already
    this.enterEditingEvent.emit({ value: this.value });
  }

  saveAndQuitEditing(): void {
    const value = this.value;

    this.saveEvent.emit({ value });

    if (this.onSaveFunction) {
      this.mode = MODES.SAVING;
      this.$saving = this.onSaveFunction({ value })
        .subscribe(
          () => {
            this.mode = MODES.IDLE;
            this.savedEvent.emit({ value });
            this.quitEditingEvent.emit({ value });
            this.$saving = null;
          },
          (error) => {
            this.mode = MODES.EDITING;
            this.failedEvent.emit({ value, error });
            this.$saving = null;
          }
        );
    } else {
      this.mode = MODES.IDLE;
    }
  }

  cancelAndQuitEditing(): void {
    const value = this.value;
    this.value = this.initialState;
    this.mode = MODES.IDLE;
    // Triggered with the value that was canceled
    this.cancelEvent.emit({ value });
    // Triggered with the actual value
    this.quitEditingEvent.emit({ value: this.value });
  }

  isIdle(): boolean {
    return this.mode === MODES.IDLE;
  }

  isEditing(): boolean {
    return this.mode === MODES.EDITING;
  }

  isSaving(): boolean {
    return this.mode === MODES.SAVING;
  }

  // Data binding

  private _value = '';

  private set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this.changed.forEach((f) => f(value));
    }
  }

  private get value(): string {
    return this._value;
  }

  private touch(): void {
    this.touched.forEach((f) => f());
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.touched.push(fn);
  }
}
