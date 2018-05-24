import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ChangeDetectorRef,
  AfterContentChecked,
  AfterViewInit,
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { startWith } from 'rxjs/operators';
import { EMPTY, merge } from 'rxjs';
import {
  getDtFormFieldDuplicatedHintError,
  getDtFormFieldMissingControlError
} from './form-field-errors';
import { DtFormFieldControl } from './form-field-control';
import { DtLabel } from './label';
import { DtHint } from './hint';
import { DtError } from './error';
import { DtPrefix } from './prefix';
import { DtSuffix } from './suffix';

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'dt-form-field',
  exportAs: 'dtFormField',
  templateUrl: 'form-field.html',
  styleUrls: ['form-field.scss'],
  host: {
    'class': 'dt-form-field',
    '[class.dt-form-field-invalid]': '_control.errorState',
    '[class.dt-form-field-disabled]': '_control.disabled',
    '[class.dt-form-field-empty]': '_control.empty',
    '[class.dt-focused]': '_control.focused',
    '[class.ng-untouched]': '_shouldForward("untouched")',
    '[class.ng-touched]': '_shouldForward("touched")',
    '[class.ng-pristine]': '_shouldForward("pristine")',
    '[class.ng-dirty]': '_shouldForward("dirty")',
    '[class.ng-valid]': '_shouldForward("valid")',
    '[class.ng-invalid]': '_shouldForward("invalid")',
    '[class.ng-pending]': '_shouldForward("pending")',
  },
  animations: [
    trigger('transitionErrors', [
      state('enter', style({ opacity: 1, transform: 'scaleY(1)' })),
      transition('void => enter', [
        style({ opacity: 0, transform: 'scaleY(0)' }),
        animate('150ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
      ]),
      transition('void => enter-delayed', [
        style({ opacity: 0, transform: 'scaleY(0)' }),
        animate(`250ms 150ms cubic-bezier(0.55, 0, 0.55, 0.2)`),
      ]),
    ]),
  ],
  // We need to disable view encapsulation on the form-field so
  // are able to style label, hint, error and the control component
  // in the ng-content areas
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtFormField<T> implements AfterContentInit, AfterContentChecked, AfterViewInit {

  // Unique id for the hint label.
  _hintLabelId = `dt-hint-${nextUniqueId++}`;

  /** State of the dt-error animations. */
  _errorAnimationState: '' | 'enter' | 'enter-delayed' = '';

  @ContentChild(DtLabel) _labelChild: DtLabel;
  @ContentChildren(DtHint) _hintChildren: QueryList<DtHint>;
  @ContentChildren(DtError) _errorChildren: QueryList<DtError>;
  @ContentChild(DtFormFieldControl) _control: DtFormFieldControl<T>;
  @ContentChildren(DtPrefix) _prefixChildren: QueryList<DtPrefix>;
  @ContentChildren(DtSuffix) _suffixChildren: QueryList<DtSuffix>;

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngAfterContentInit(): void {
    this._validateControlChild();

    // Subscribe to changes in the child control state in order to update the form field UI.
    this._control.stateChanges.pipe(startWith(null!)).subscribe(() => {
      this._syncDescribedByIds();
      this._updateAnimationState();
      this._changeDetectorRef.markForCheck();
    });

    // Run change detection if the value, prefix, or suffix changes.
    const valueChanges = this._control.ngControl && this._control.ngControl.valueChanges || EMPTY;
    merge(valueChanges, this._prefixChildren.changes, this._suffixChildren.changes)
        .subscribe(() => this._changeDetectorRef.markForCheck());

    // Re-validate when the number of hints changes.
    this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });

    // Update the aria-described by when the number of errors changes.
    this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
      this._syncDescribedByIds();
      this._updateAnimationState();
      this._changeDetectorRef.markForCheck();
    });
  }

  ngAfterContentChecked(): void {
    this._validateControlChild();
  }

  ngAfterViewInit(): void {
    // Avoid animations on load.
    this._errorAnimationState = 'enter';
    this._changeDetectorRef.detectChanges();
  }

  /** Determines whether a class from the NgControl should be forwarded to the host element. */
  _shouldForward(prop: string): boolean {
    const ngControl = this._control ? this._control.ngControl : null;
    // tslint:disable-next-line:no-any no-unnecessary-type-assertion
    return ngControl && (ngControl as any)[prop];
  }

  /** Determines whether to display errors or not. */
  _getDisplayedError(): boolean {
    return this._errorChildren && this._errorChildren.length > 0 &&
      this._control.errorState;
  }

  /** Throws an error if the form field's control is missing. */
  private _validateControlChild(): void {
    if (!this._control) {
      throw getDtFormFieldMissingControlError();
    }
  }

  /** Does any extra processing that is required when handling the hints. */
  private _processHints(): void {
    this._validateHints();
    this._syncDescribedByIds();
    this._updateAnimationState();
  }

  /**
   * Ensure that there is a maximum of one of each `<dt-hint>` alignment specified, with the
   * attribute being considered as `align="start"`.
   */
  private _validateHints(): void {
    if (this._hintChildren) {
      let startHint: DtHint;
      let endHint: DtHint;
      this._hintChildren.forEach((hint: DtHint) => {
        if (hint.align === 'start') {
          if (startHint) {
            throw getDtFormFieldDuplicatedHintError('start');
          }
          startHint = hint;
        } else if (hint.align === 'end') {
          if (endHint) {
            throw getDtFormFieldDuplicatedHintError('end');
          }
          endHint = hint;
        }
      });
    }
  }

  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  private _syncDescribedByIds(): void {
    if (this._control) {
      let ids: string[] = [];

      if (!this._getDisplayedError()) {
        const startHint = this._hintChildren ?
          this._hintChildren.find((hint) => hint.align === 'start') : null;
        const endHint = this._hintChildren ?
          this._hintChildren.find((hint) => hint.align === 'end') : null;

        if (startHint) {
          ids.push(startHint.id);
        }

        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids = this._errorChildren.map((error) => error.id);
      }
      this._control.setDescribedByIds(ids);
    }
  }

  private _updateAnimationState(): void {
    this._errorAnimationState = this._getDisplayedError() &&
    this._control.focused ? 'enter-delayed' : 'enter';
  }
}
