import { Directive, Input, ElementRef, TemplateRef, NgZone } from '@angular/core';
import { DtOverlay } from './overlay';
import { DtOverlayConfig } from './overlay-config';
import { DtOverlayRef } from './overlay-ref';
import { Subscription, fromEvent } from 'rxjs';

@Directive({
  selector: '[dtOverlay]',
  exportAs: 'dtOverlayTrigger',
  host: {
    '(mouseover)': '_onMouseOver($event)',
    '(mouseout)': '_onMouseOut($event)',
    '(click)': '_handleClick()',
  },
})
export class DtOverlayTrigger<T> {
  private _content: TemplateRef<T>;
  private _config: DtOverlayConfig = new DtOverlayConfig();
  private _dtOverlayRef: DtOverlayRef<T> | null = null;
  private _moveSub = Subscription.EMPTY;

  /** Overlay pane containing the content */

  @Input('dtOverlay')
  set overlay(value: TemplateRef<T>) {
    this._content = value;
  }

  @Input()
  get dtOverlayConfig(): DtOverlayConfig { return this._config; }
  set dtOverlayConfig(value: DtOverlayConfig) {
    this._config = value;
  }

  constructor(
    public elementRef: ElementRef,
    protected dtOverlayService: DtOverlay,
    private _ngZone: NgZone
  ) {}

  _onMouseOver(event: MouseEvent): void {
    event.stopPropagation();
    this._dtOverlayRef = this.dtOverlayService.create<T>(this.elementRef, this._content, this._config);
    this._ngZone.runOutsideAngular(() => {
      this._moveSub = fromEvent(this.elementRef.nativeElement, 'mousemove')
      .subscribe((ev: MouseEvent) => {
        this._onMouseMove(ev);
      });
    });
  }

  _onMouseOut(event: MouseEvent): void {
    event.stopPropagation();
    this._moveSub.unsubscribe();

    const ref = this.dtOverlayService.overlayRef;
    if (ref && !ref.pinned) {
      this.dtOverlayService.close();
    }
  }

  _onMouseMove(event: MouseEvent): void {
    if (this._dtOverlayRef && !this._dtOverlayRef.pinned) {
      this._dtOverlayRef._updatePositionFromMouse(event.offsetX, event.offsetY);
    }
  }

  _handleClick(): void {
    if (this._config.pinnable && this._dtOverlayRef) {
      console.log('pinned');
      this._dtOverlayRef.pin(true);
    }
  }
}
