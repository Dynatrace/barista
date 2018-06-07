import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  forwardRef,
  Attribute,
  Directive,
  Provider
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusOrigin, FocusMonitor } from '@angular/cdk/a11y';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  CheckboxRequiredValidator
} from '@angular/forms';
import {
  mixinTabIndex,
  mixinDisabled,
  CanDisable,
  HasTabIndex
} from '../core/index';

/**
 * Checkbox IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let nextUniqueId = 0;

/** Represents the different states that require custom transitions between them. */
export const enum TransitionCheckState {
  /** The initial state of the component before any user interaction. */
  Init,
  /** The state representing the component when it's becoming checked. */
  Checked,
  /** The state representing the component when it's becoming unchecked. */
  Unchecked,
  /** The state representing the component when it's becoming indeterminate. */
  Indeterminate,
}

/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
export const DT_CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line:no-forward-ref no-use-before-declare
  useExisting: forwardRef(() => DtCheckbox),
  multi: true,
};

/** Change event object emitted by DtCheckbox */
export interface DtCheckboxChange {
  source: DtCheckbox;
  checked: boolean;
}

// Boilerplate for applying mixins to DtCheckbox.
export class DtCheckboxBase { }
export const _DtCheckboxMixinBase = mixinTabIndex(mixinDisabled(DtCheckboxBase));

@Component({
  moduleId: module.id,
  selector: 'dt-checkbox',
  templateUrl: 'checkbox.html',
  styleUrls: ['checkbox.scss'],
  exportAs: 'dtCheckbox',
  host: {
    '[id]': 'id',
    'class': 'dt-checkbox',
    '[class.dt-checkbox-checked]': 'checked',
    '[class.dt-checkbox-disabled]': 'disabled',
    '(focus)': '_inputElement.nativeElement.focus()',
  },
  inputs: ['disabled', 'tabIndex'],
  providers: [DT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtCheckbox extends _DtCheckboxMixinBase
  implements CanDisable, HasTabIndex, AfterViewInit, OnDestroy, ControlValueAccessor {

  /** Whether or not the checkbox is checked. */
  @Input()
  get checked(): boolean { return this._checked; }
  set checked(value: boolean) {
    const coercedValue = coerceBooleanProperty(value);
    if (coercedValue !== this._checked) {
      this._checked = coercedValue;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Unique id of the element. */
  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }

  /** Whether the checkbox is required. */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) { this._required = coerceBooleanProperty(value); }

  /** Name value will be applied to the input element if present */
  @Input() name: string | null = null;

  /** The value attribute of the native input element */
  @Input() value: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  // tslint:disable-next-line:no-input-rename
  @Input('aria-label') ariaLabel = '';

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  // tslint:disable-next-line:no-input-rename
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /**
   * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
   * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
   * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
   * set to false.
   */
  @Input()
  get indeterminate(): boolean { return this._indeterminate; }
  set indeterminate(value: boolean) {
    const changed = value !== this._indeterminate;
    this._indeterminate = value;

    if (changed) {
      if (this._indeterminate) {
        this._transitionCheckState(TransitionCheckState.Indeterminate);
      } else {
        this._transitionCheckState(
          this.checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
      }
      this.indeterminateChange.emit(this._indeterminate);
    }
  }

  /** Event emitted when the checkbox's `checked` value changes. */
  // tslint:disable-next-line:no-output-named-after-standard-event
  @Output() readonly change = new EventEmitter<DtCheckboxChange>();

  /** Event emitted when the checkbox's `indeterminate` value changes. */
  @Output() readonly indeterminateChange = new EventEmitter<boolean>();

  /** The native radio input element */
  @ViewChild('input') _inputElement: ElementRef;

  /** Returns the unique id for the visual hidden input. */
  get _inputId(): string { return `${this.id}-input`; }

  _onTouched: () => void = () => { };

  private _checked = false;
  private _uid = `dt-checkbox-${nextUniqueId++}`;
  private _id: string;
  private _required: boolean;
  private _indeterminate = false;
  private _currentCheckState: TransitionCheckState = TransitionCheckState.Init;
  private _currentAnimationClass = '';
  private _controlValueAccessorChangeFn: (value: boolean) => void = () => { };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
    @Attribute('tabindex') tabIndex: string
  ) {
    super();

    // Force setter to be called in case id was not specified.
    this.id = this.id;
    this.tabIndex = parseInt(tabIndex, 10) || 0;
  }

  ngAfterViewInit(): void {
    this._focusMonitor
      .monitor(this._inputElement.nativeElement, false)
      .subscribe((focusOrigin) => { this._onInputFocusChange(focusOrigin); });
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._inputElement.nativeElement);
  }

  /** Focuses the checkbox. */
  focus(): void {
    this._focusMonitor.focusVia(this._inputElement.nativeElement, 'keyboard');
  }

  /** Toggles the `checked` state of the checkbox. */
  toggle(): void {
    this.checked = !this.checked;
  }

  _onInputClick(event: Event): void {
    // We have to stop propagation for click events on the visual hidden input element.
    // Otherwise this will lead to multiple click events.
    event.stopPropagation();

    if (!this.disabled) {
      if (this.indeterminate) {
        Promise.resolve().then(() => {
          this._indeterminate = false;
          this.indeterminateChange.emit(this._indeterminate);
        });
      }

      this.toggle();
      this._transitionCheckState(
        this._checked ? TransitionCheckState.Checked : TransitionCheckState.Unchecked);
      this._emitChangeEvent();
    }
  }

  _onInputChange(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  _getAriaChecked(): 'true' | 'false' | 'mixed' {
    return this.checked ? 'true' : (this.indeterminate ? 'mixed' : 'false');
  }

  /** Implemented as a part of ControlValueAccessor. */
  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  /** Implemented as a part of ControlValueAccessor. */
  registerOnChange(fn: (value: boolean) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  /** Implemented as a part of ControlValueAccessor. */
  registerOnTouched(fn: () => void = () => { }): void {
    this._onTouched = fn;
  }

  private _onInputFocusChange(focusOrigin: FocusOrigin): void {
    const element = this._elementRef.nativeElement;

    if (focusOrigin === 'keyboard') {
      element.classList.add('dt-checkbox-focused');
    } else if (!focusOrigin) {
      element.classList.remove('dt-checkbox-focused');
      this._onTouched();
    }
  }

  private _emitChangeEvent(): void {
    this._controlValueAccessorChangeFn(this.checked);
    this.change.emit({ source: this, checked: this.checked });
  }

  private _transitionCheckState(newState: TransitionCheckState): void {
    const oldState = this._currentCheckState;
    const element: HTMLElement = this._elementRef.nativeElement;

    if (oldState === newState) {
      return;
    }
    if (this._currentAnimationClass.length > 0) {
      element.classList.remove(this._currentAnimationClass);
    }

    this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
    this._currentCheckState = newState;

    if (this._currentAnimationClass.length > 0) {
      element.classList.add(this._currentAnimationClass);
    }
  }

  private _getAnimationClassForCheckStateTransition(
    oldState: TransitionCheckState, newState: TransitionCheckState): string {
    let animSuffix = '';

    switch (oldState) {
      case TransitionCheckState.Init:
        // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
        // [checked] bound to it.
        if (newState === TransitionCheckState.Checked) {
          animSuffix = 'unchecked-checked';
        } else if (newState === TransitionCheckState.Indeterminate) {
          animSuffix = 'unchecked-indeterminate';
        } else {
          return '';
        }
        break;
      case TransitionCheckState.Unchecked:
        animSuffix = newState === TransitionCheckState.Checked ?
          'unchecked-checked' : 'unchecked-indeterminate';
        break;
      case TransitionCheckState.Checked:
        animSuffix = newState === TransitionCheckState.Unchecked ?
          'checked-unchecked' : 'checked-indeterminate';
        break;
      case TransitionCheckState.Indeterminate:
        animSuffix = newState === TransitionCheckState.Checked ?
          'indeterminate-checked' : 'indeterminate-unchecked';
        break;
    }

    return `dt-checkbox-anim-${animSuffix}`;
  }
}

export const DT_CHECKBOX_REQUIRED_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line:no-forward-ref no-use-before-declare
  useExisting: forwardRef(() => DtCheckboxRequiredValidator),
  multi: true,
};

/**
 * Validator for checkbox's required attribute in template-driven checkbox.
 * TODO @thomaspink: Remove once CheckboxRequiredValidator supports custom checkbox
 */
@Directive({
  selector: `dt-checkbox[required][formControlName],
             dt-checkbox[required][formControl], dt-checkbox[required][ngModel]`,
  providers: [DT_CHECKBOX_REQUIRED_VALIDATOR],
  host: { '[attr.required]': 'required ? "" : null' },
})
export class DtCheckboxRequiredValidator extends CheckboxRequiredValidator { }
