import { CdkTrapFocus, FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  addCssClass,
  clamp,
  DT_NO_POINTER_CSS_CLASS,
  isDefined,
  readKeyCode,
  removeCssClass,
} from '@dynatrace/angular-components/core';
import { DtOverlayRef } from '@dynatrace/angular-components/overlay';

/** Change event object emitted by DtSelectionArea */
export interface DtSelectionAreaChange {
  source: DtSelectionArea;
  left: number;
  width: number;
  right: number;
}

/** @internal Vertical distance between the overlay and the selection area */
const DT_SELECTION_AREA_OVERLAY_SPACING = 10;

/** @internal The size factor to the origin width the selection area is created with when created by keyboard */
const DT_SELECTION_AREA_KEYBOARD_DEFAULT_SIZE = 0.5;

/** @internal The position the selection area is created at when created by keyboard */
const DT_SELECTION_AREA_KEYBOARD_DEFAULT_START = 0.25;

/** @internal The step size for the keyboard interaction on PAGE UP and PAGE DOWN */
const DT_SELECTION_AREA_KEYBOARD_BIG_STEP = 10;

/** @internal Eventtarget for the mouse events on the selection area */
type DtSelectionAreaEventTarget = 'box' | 'left-handle' | 'right-handle' | 'origin';

@Component({
  selector: 'dt-selection-area',
  exportAs: 'dtSelectionArea',
  templateUrl: 'selection-area.html',
  styleUrls: ['selection-area.scss'],
  host: {
    class: 'dt-selection-area, dt-no-pointer',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})

export class DtSelectionArea {

  /** Emits when the box changes position or size */
  @Output()
  readonly changed: EventEmitter<DtSelectionAreaChange> = new EventEmitter();

  /** Emits when the box is closed */
  @Output()
  readonly closed: EventEmitter<void> = new EventEmitter();

  /** @internal The box that gets created by the users action */
  @ViewChild('box') _box: ElementRef<HTMLDivElement>;
  /** @internal The overlay adjascent to the box */
  @ViewChild(CdkConnectedOverlay) _overlay: CdkConnectedOverlay;
  /** @internal The left handle of the box */
  @ViewChild('lefthandle') _lefthandle: ElementRef;
  /** @internal The right handle of the box */
  @ViewChild('righthandle') _rigthandle: ElementRef;

  /** @internal Indicates if the box is visible */
  _isBoxVisible = false;

  /** Positions for the overlay that gets created */
  _positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -DT_SELECTION_AREA_OVERLAY_SPACING,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: DT_SELECTION_AREA_OVERLAY_SPACING,
    },
  ];

  /** Indicator if its being touched */
  private _touching: boolean;
  /** Horizontal start position of an operation */
  private _startX: number;
  /** Start width when performing an operation */
  private _startWidth: number;
  /** The width of the box */
  private _width = 0;
  /** The horizontal offset is needed when grabbing the entire box to calculate the new position correctly */
  private _offsetX = 0;
  /** The distance from the left edge of the box to the edge of the origin element */
  private _left: number | null;
  /** The distance from the right edge of the box to the edge of the origin element */
  private _right: number | null;
  /** The boundaries of the origin element - are used to position the selection area correctly and for movement constriants */
  private _boundaries: ClientRect;
  /** The target of the mousedown event - is needed to differentiate what part of the box is targeted */
  private _eventTarget: DtSelectionAreaEventTarget;
  /** Array of unregister functions on the window */
  private _detachFns: Array<() => void> = [];

  /** The ref to the DtOverlay */
  private _overlayRef: DtOverlayRef<void>;

  /** The focus trap inside the overlay */
  private _overlayFocusTrap: FocusTrap;

  /** @internal The focus trap for the box */
  @ViewChild(CdkTrapFocus) _boxFocusTrap: CdkTrapFocus;

  constructor(
    private _ref: ElementRef,
    private _renderer: Renderer2,
    private _zone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusTrapFactory: FocusTrapFactory
  ) { }

  ngOnDestroy(): void {
    this._detachWindowListeners();
    if (this._overlayFocusTrap) {
      this._overlayFocusTrap.destroy();
    }
    this.close();
  }

  /** Closes and destroys the box */
  close(): void {
    this._reset();
    this.closed.next();
    this.closed.complete();
  }

  /** Sets the focus to the selection area */
  focus(): void {
    if (this._isBoxVisible) {
      this._box.nativeElement.focus();
    }
  }

  /** Attaches the eventlisteners to the window */
  private _attachWindowEventListeners(): void {
    this._detachWindowListeners();
    // tslint:disable-next-line:strict-type-predicates
    if (typeof window !== 'undefined') {
      this._zone.runOutsideAngular(() => {
        this._detachFns.push(this._renderer.listen(window, 'mousemove', this._handleMousemove));
        this._detachFns.push(this._renderer.listen(window, 'mouseup', this._handleMouseup));
      });
    }
  }

  /** Detaches the window listeners */
  private _detachWindowListeners(): void {
    this._detachFns.forEach((fn) => { fn(); });
    this._detachFns = [];
  }

  private _calculatePosition(deltaX: number): void {
    let left: number | null;
    let right: number | null;
    let width = this._width;
    switch (this._eventTarget) {
      case 'box':
        const newleft = this._startX + deltaX - this._offsetX;
        left = clamp(newleft, 0, this._boundaries.width - width);
        right = null;
        break;
      case 'left-handle':
        if (this._startWidth - deltaX < 0) {
          width = deltaX - this._startWidth;
          right = null;
          left = this._startX + this._startWidth;
        } else {
          /** cursor is moved over the area until it hits the right handle */
          width = this._startWidth - deltaX;
          left = null;
          right = this._boundaries.width - this._startX - this._startWidth;
        }
        break;
      case 'right-handle':
        if (this._startWidth + deltaX < 0) {
          width = Math.abs(this._startWidth + deltaX);
          left = null;
          right = this._boundaries.width - this._startX + this._startWidth;
        } else {
          /** cursor is moved to the right */
          left = this._startX - this._startWidth;
          right = null;
          width = this._startWidth + deltaX;
        }
        break;
      case 'origin':
      default:
        width = Math.abs(deltaX);
        if (deltaX >= 0) {
          left = this._startX;
          right = null;
        } else {
          left = null;
          right = this._boundaries.width - this._startX;
        }
    }
    /** clamp */
    if (left !== null) {
      width = clamp(width, 0, this._boundaries.width - left);
    }
    if (right !== null) {
      width = clamp(width, 0, this._boundaries.width - right);
    }
    this._width = width;
    this._left = left;
    this._right = right;
  }

  /** Handles position and width calculation on mousedown */
  private _handleMousemove = (ev: MouseEvent) => {
    ev.preventDefault();
    const deltaX = this._calculateRelativeXPos(ev.clientX) - this._startX;
    this._calculatePosition(deltaX);
  }

  /** Handles mouseup */
  private _handleMouseup = (ev: MouseEvent) => {
    ev.preventDefault();
    // removeCssClass(this._origin, 'dt-cursor-grabbing');
    this._offsetX = 0;
    this._touching = false;
    this._togglePointerEvents(false);
    this._detachWindowListeners();
    this._boxFocusTrap.focusTrap.focusFirstTabbableElement();
  }

  /** @internal Handle mousedown on the left handle */
  _handleLeftHandleMouseDown(event: MouseEvent): void {
    this._handleBoxEvent(event, 'left-handle');
    this._startWidth = this._width;
  }

  /** @internal Handle mousedown on the right handle */
  _handleRightHandleMouseDown(event: MouseEvent): void {
    this._handleBoxEvent(event, 'right-handle');
    this._startWidth = this._width;
  }

  /** @internal Handle mousedown on the area */
  _handleBoxMouseDown(event: MouseEvent): void {
    this._handleBoxEvent(event, 'box');
    this._offsetX = this._calculateRelativeXPosToBox(event);
    // addCssClass(this._origin, 'dt-cursor-grabbing');
  }

  /** @internal Handle keyboard interaction on keydown on the box */
  _handleBoxKeyDown(event: KeyboardEvent): void {
    const keyCode = readKeyCode(event);
    this._eventTarget = 'box';
    this._startX = this._left !== null ? this._left : (this._boundaries.width - (this._right! + this._width));
    const offset = this._moveByKeycode(keyCode);
    if (isDefined(offset)) {
      event.preventDefault();
      event.stopPropagation();
      this._applySizeAndPosition();
    }
  }

  /** @internal Handle keyboard interaction on keydown on the left handle */
  _handleLeftHandleKeyDown(event: KeyboardEvent): void {
    const keyCode = readKeyCode(event);
    this._eventTarget = 'left-handle';
    this._startWidth = this._width;
    this._startX = this._left !== null ? this._left : (this._boundaries.width - (this._right! + this._width));
    const offset = this._moveByKeycode(keyCode);
    if (isDefined(offset)) {
      event.preventDefault();
      event.stopPropagation();
      this._applySizeAndPosition();
      if (this._width < offset!) {
        this._rigthandle.nativeElement.focus();
      }
    }
  }

  /** Handle keyboard interaction on keydown for the right handle */
  _handleRightHandleKeyDown(event: KeyboardEvent): void {
    const keyCode = readKeyCode(event);
    this._eventTarget = 'right-handle';
    this._startWidth = this._width;
    this._startX = this._left !== null ? (this._left + this._width) : (this._boundaries.width - this._right!);
    const offset = this._moveByKeycode(keyCode);
    if (isDefined(offset)) {
      event.preventDefault();
      event.stopPropagation();
      this._applySizeAndPosition();
      if (offset! < 1 && this._width < Math.abs(offset!)) {
        this._lefthandle.nativeElement.focus();
      }
    }
  }

  /** Sets the correct offset for a given keycode and calculates the new position and width */
  private _moveByKeycode(keyCode: number): number | undefined {
    let offset;
    switch (keyCode) {
      case LEFT_ARROW:
      case UP_ARROW:
        offset = -1;
        break;
      case RIGHT_ARROW:
      case DOWN_ARROW:
        offset = 1;
        break;
      case PAGE_UP:
        offset = -DT_SELECTION_AREA_KEYBOARD_BIG_STEP;
        break;
      case PAGE_DOWN:
        offset = DT_SELECTION_AREA_KEYBOARD_BIG_STEP;
        break;
      case HOME:
        offset = -(this._boundaries.width + this._width);
        break;
      case END:
        offset = this._boundaries.width + this._width;
        break;
      default:
    }
    if (isDefined(offset)) {
      this._calculatePosition(offset);
    }
    return offset;
  }

  /** @internal Handles the closing action on the selection area */
  _handleClose(event: MouseEvent): void {
    event.preventDefault();
    this.close();
  }

  /** @internal Callback that is invoked when the overlay panel has been attached. */
  _onOverlayAttached(): void {
    /** create the focus trap within the overlay */
    if (!this._overlayFocusTrap) {
      this._overlayFocusTrap = this._focusTrapFactory.create(this._overlay.overlayRef.overlayElement);
      this._attachFocusTrapListeners();
    }
  }

  /** @internal Callback that is invoked when the overlay panel has been detached - is called when ESCAPE is pressed */
  _onOverlayDetach(): void {
    this._reset();
  }

  /** Attacheds the eventlisteners for the focus traps connected to each other */
  private _attachFocusTrapListeners(): void {
    this._zone.runOutsideAngular(() => {
      const overlayAnchors = [].slice.call(this._overlay.overlayRef.hostElement.querySelectorAll('.cdk-focus-trap-anchor'));
      overlayAnchors[0].addEventListener('focus', (ev: FocusEvent) => {
        ev.preventDefault();
        this._boxFocusTrap.focusTrap.focusLastTabbableElement();
      });
      overlayAnchors[1].addEventListener('focus', (ev: FocusEvent) => {
        ev.preventDefault();
        this._boxFocusTrap.focusTrap.focusFirstTabbableElement();
      });
      const boxAnchors = [].slice.call(this._ref.nativeElement.querySelectorAll('.cdk-focus-trap-anchor'));
      boxAnchors[0].addEventListener('focus', (ev: FocusEvent) => {
        ev.preventDefault();
        this._overlayFocusTrap.focusLastTabbableElement();
      });
      boxAnchors[1].addEventListener('focus', (ev: FocusEvent) => {
        ev.preventDefault();
        this._overlayFocusTrap.focusFirstTabbableElement();
      });
    });
  }

  /** Shared event handling for mousedown events on the box */
  private _handleBoxEvent(event: MouseEvent | KeyboardEvent, target: DtSelectionAreaEventTarget): void {
    event.preventDefault();
    event.stopPropagation();
    this._touching = true;
    this._togglePointerEvents(true);
    this._eventTarget = target;
    this._attachWindowEventListeners();
    if (event instanceof MouseEvent) {
      this._startX = this._calculateRelativeXPos(event.clientX);
    }
    this._update();
  }

  /** @internal Creates the selection area */
  _create(posX?: number): void {
    this._reset();
    if (this._boundaries) {
      this._isBoxVisible = true;
      this._touching = true;
      this._togglePointerEvents(true);
      this._attachWindowEventListeners();
      this._eventTarget = 'origin';

      if (posX) {
        this._startX = this._calculateRelativeXPos(posX);
        this._left = this._startX;
        // Call update to trigger reflecting the changes to the element
        this._update();
      } else {
        // Create area at defaut position if no position has been provided
        // no need to use request animation frame here since this is done for keyboard events
        this._startX = 0;
        this._left = this._boundaries.width * DT_SELECTION_AREA_KEYBOARD_DEFAULT_START;
        this._width = this._boundaries.width * DT_SELECTION_AREA_KEYBOARD_DEFAULT_SIZE;
        this._right = null;
        this._applySizeAndPosition();
      }
    }
    this._changeDetectorRef.markForCheck();
  }

  /** Update function that applies calculated width and position to the box dom element */
  private _update(): void {
    requestAnimationFrame(() => {
      if (!this._touching) {
        return;
      }
      this._applySizeAndPosition();
      this._update();
    });
  }

  /** Applies the properties to the box dom element */
  private _applySizeAndPosition(): void {
    this._box.nativeElement.style.width = `${this._width}px`;

    if (this._left !== null) {
      this._box.nativeElement.style.left = `${this._left}px`;
      this._box.nativeElement.style.right = '';
    } else {
      this._box.nativeElement.style.left = '';
      this._box.nativeElement.style.right = `${this._right}px`;
    }
    if (this._overlay && this._overlay.overlayRef) {
      this._overlay.overlayRef.updatePosition();
    }

    const left = this._left !== null ? this._left : this._boundaries.width - this._right! - this._width;
    const right = this._right !== null ? this._right : this._boundaries.width - this._left! - this._width;
    this.changed.emit({
      left,
      right,
      width: this._width,
      source: this,
    });
  }

  /** Sets and removes the pointer events on the box */
  private _togglePointerEvents(touching: boolean): void {
    if (touching) {
      addCssClass(this._box.nativeElement, DT_NO_POINTER_CSS_CLASS);
    } else {
      removeCssClass(this._box.nativeElement, DT_NO_POINTER_CSS_CLASS);
    }
  }

  /** @internal Apply boundaries to the host element ref to match the origin */
  _applyBoundaries(boundaries: ClientRect): void {
    // TODO: FFR improvement - recalculate here on newly given boundaries so we dont have to destroy the selection area every time
    this._reset();

    // tslint:disable-next-line:strict-type-predicates
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    this._ref.nativeElement.style.left = `${boundaries.left}px`;
    this._ref.nativeElement.style.top = `${boundaries.top + scrollY}px`;
    this._ref.nativeElement.style.width = `${boundaries.width}px`;
    this._ref.nativeElement.style.height = `${boundaries.height}px`;
    this._boundaries = boundaries;
  }

  /** Calculates the horizontal position relative to the boundaries */
  private _calculateRelativeXPos(posX: number): number {
    return posX - this._boundaries.left;
  }

  /** Calculates the relative horizontal position to the box  */
  private _calculateRelativeXPosToBox(ev: MouseEvent): number {
    const targetBoundingClientRect = this._box.nativeElement.getBoundingClientRect();
    return ev.clientX - targetBoundingClientRect.left;
  }

  /** Resets the box and all properties */
  private _reset(): void {
    if (this._overlayRef) {
      this._overlayRef.dismiss();
    }
    this._hideAndResetBox();
    this._changeDetectorRef.markForCheck();
  }

  private _hideAndResetBox(): void {
    if (this._isBoxVisible) {
      this._box.nativeElement.style.width = '0px';
      removeCssClass(this._box.nativeElement, DT_NO_POINTER_CSS_CLASS);
      this._width = 0;
      this._left = null;
      this._isBoxVisible = false;
    }
  }
}

export function isElementScrolledOutsideView(element: ClientRect, scrollContainers: ClientRect[]): boolean {
  return scrollContainers.some((containerBounds) => {
    const outsideAbove = element.bottom < containerBounds.top;
    const outsideBelow = element.top > containerBounds.bottom;
    const outsideLeft = element.right < containerBounds.left;
    const outsideRight = element.left > containerBounds.right;

    return outsideAbove || outsideBelow || outsideLeft || outsideRight;
  });
}
