import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { ENTER } from '@angular/cdk/keycodes';
import {
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  Optional,
  Renderer2,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  animationFrameScheduler,
  fromEvent,
  merge,
  of,
} from 'rxjs';
import {
  concatMapTo,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  skip,
  switchMap,
  take,
  takeUntil,
  tap,
  throttleTime,
} from 'rxjs/operators';

import {
  DtFlexibleConnectedPositionStrategy,
  DtViewportResizer,
  addCssClass,
  getElementBoundingClientRect,
  readKeyCode,
  removeCssClass,
} from '@dynatrace/angular-components/core';

import { DtChart } from '../chart';
import { clampRange } from '../range/clamp-range';
import { DtChartRange } from '../range/range';
import { DtChartTimestamp } from '../timestamp/timestamp';
import {
  captureAndMergeEvents,
  chainFocusTraps,
  getElementRef,
  getRelativeMousePosition,
  setPosition,
} from '../utils';
import {
  DT_SELECTION_AREA_OVERLAY_POSITIONS,
  GRAB_CURSOR_CLASS,
  HIGHCHARTS_SERIES_GROUP,
  HIGHCHARTS_X_AXIS_GRID,
  HIGHCHARTS_Y_AXIS_GRID,
  NO_POINTER_EVENTS_CLASS,
  getDtNoPlotBackgroundError,
} from './constants';
import {
  getClickStream,
  getDragStream,
  getElementRefStream,
  getMouseDownStream,
  getMouseMove,
  getMouseOutStream,
  getMouseUpStream,
  getRangeCreateStream,
  getRangeResizeStream,
  getTouchEndStream,
  getTouchMove,
  getTouchStartStream,
  getTouchStream,
} from './streams';

@Component({
  selector: 'dt-chart-selection-area',
  templateUrl: 'selection-area.html',
  styleUrls: ['selection-area.scss'],
  // Disable view encapsulation to style the overlay content that is located outside this component
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dt-chart-selection-area dt-no-pointer-events',
    '[attr.tabindex]': '0',
    '(keydown)': '_createSelection($event)',
  },
})
export class DtChartSelectionArea implements AfterContentInit, OnDestroy {
  /** @internal The timestamp that follows the mouse */
  @ViewChild('hairline', { static: true })
  _hairline: ElementRef<HTMLDivElement>;

  /** mousedown event stream on the selection area emits only left mouse */
  private _mousedown$: Observable<MouseEvent> = EMPTY;

  /** mouse up stream on the window */
  private _mouseup$: Observable<MouseEvent> = EMPTY;

  /** drag event based on a left click on the selection area */
  private _drag$: Observable<{ x: number; y: number }> = EMPTY;

  /** drag event triggered by a boundary drag-resize *(only available within a range)* */
  private _dragHandle$: Observable<{ x: number; y: number }> = EMPTY;

  /** click event stream that emits only click events on the selection area */
  private _click$: Observable<{ x: number; y: number }> = EMPTY;

  /** Instance of the chart range if one is present */
  private _range?: DtChartRange;

  /** Instance of the chart timestamp if one is present */
  private _timestamp?: DtChartTimestamp;

  /** The ref of the selection area overlay */
  private _overlayRef: OverlayRef | null;

  /** The focus trap inside the overlay */
  private _overlayFocusTrap: FocusTrap | null;

  /** Template portal of the selection area overlay */
  private _portal: TemplatePortal | null;

  /**
   * Highcharts plotBackground is used to size the selection area according to this area
   * is set after Highcharts render is completed.
   */
  private _plotBackground: SVGRectElement | null;

  /** Array of Elements where we capture events in case that we disable pointer events on selection Area */
  private _mouseDownElements: Element[] = [];

  /** Bounding Client Rect of the selection area. set after Highcharts render */
  private _selectionAreaBcr?: ClientRect;

  /** Subject to unsubscribe from every subscription */
  private _destroy$ = new Subject<void>();

  constructor(
    @SkipSelf() private _chart: DtChart,
    private _elementRef: ElementRef<HTMLElement>,
    private _focusTrapFactory: FocusTrapFactory,
    private _renderer: Renderer2,
    private _overlay: Overlay,
    private _zone: NgZone,
    private _viewportRuler: ViewportRuler,
    private _platform: Platform,
    private _overlayContainer: OverlayContainer,
    @Inject(DOCUMENT) private _document: Document,
    @Optional() private _viewportResizer: DtViewportResizer,
  ) {}

  ngAfterContentInit(): void {
    // after Highcharts is rendered we can start initializing the selection area.
    this._chart._afterRender
      .pipe(
        concatMapTo(this._chart._plotBackground$),
        // plot background can be null as well
        filter<SVGRectElement>(Boolean),
        takeUntil(this._destroy$),
      )
      .subscribe(plotBackground => {
        this._plotBackground = plotBackground;
        this._range = this._chart._range;
        this._timestamp = this._chart._timestamp;

        // set the toPixels method on the timestamp and range to calculate a px value for an
        // value on the xAxis alongside with the toValue function.
        if (this._chart._chartObject) {
          const xAxis = this._chart._chartObject.xAxis[0];

          if (this._timestamp) {
            this._timestamp._valueToPixels = xAxis.toPixels.bind(xAxis);
            this._timestamp._pixelsToValue = xAxis.toValue.bind(xAxis);
            this._timestamp._maxValue = xAxis.dataMax;
            this._timestamp._minValue = xAxis.dataMin;
          }

          if (this._range) {
            this._range._valueToPixels = xAxis.toPixels.bind(xAxis);
            this._range._pixelsToValue = xAxis.toValue.bind(xAxis);
            this._range._maxValue = xAxis.dataMax;
            this._range._minValue = xAxis.dataMin;
            this._range._maxWidth = getElementBoundingClientRect(
              plotBackground,
            ).width;
            this._range._reflectToDom();
          }
        }

        if (this._timestamp) {
          this._timestamp._plotBackgroundChartOffset = this._chart._plotBackgroundChartOffset;
        }

        if (this._range) {
          this._range._plotBackgroundChartOffset = this._chart._plotBackgroundChartOffset;
        }

        // resize the selection area to the size of the Highcharts plot background.
        this._updateSelectionAreaSize();
        // get the BCR of the selection Area
        this._selectionAreaBcr = getElementBoundingClientRect(this._elementRef);

        // start initializing the selection area with all the mouse events.
        this._initializeSelectionArea();
        // initializes the Hairline, the timestamp that follows the mouse
        // and listens for mouse-moves to update the position of the hairline.
        this._initializeHairline();
      });

    // we have to skip the first (initial) after render and then we reset
    // the range and timestamp each time something changes.
    this._chart._afterRender
      .pipe(
        skip(1), // don't reset on first draw
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._reset();
      });
  }

  ngOnDestroy(): void {
    this._closeOverlay();
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * @internal
   * Is used to create a selection that is triggered
   * by keyboard interaction on hitting enter called by host binding
   * @param $event Keyboard event that is fired on the selection area
   */
  _createSelection(event: KeyboardEvent): void {
    if (readKeyCode(event) !== ENTER || !this._selectionAreaBcr) {
      return;
    }

    if ((this._range && this._timestamp) || this._timestamp) {
      // place the timestamp in the middle
      // tslint:disable-next-line: no-magic-numbers
      this._setTimestamp(this._selectionAreaBcr.width / 2);
    } else {
      // tslint:disable-next-line: no-magic-numbers
      const quarter = this._selectionAreaBcr.width / 4;
      // tslint:disable-next-line: no-magic-numbers
      this._setRange(quarter, quarter * 2);
    }
  }

  /** Resets the range and timestamp if present */
  private _reset(): void {
    // If the chart changes we need to destroy the range and the timestamp
    if (this._range) {
      this._range._reset();
    }

    if (this._timestamp) {
      this._timestamp._reset();
    }
    this._closeOverlay();
  }

  /** Toggles the range and sets it programmatically with the provided values */
  private _setRange(left: number, width?: number): void {
    if (!this._range || !this._selectionAreaBcr) {
      return;
    }
    this._closeOverlay();
    this._toggleRange(true);
    const minWidth = !width ? this._range._calculateMinWidth(left) : width;
    const maxWidth = this._selectionAreaBcr.width;
    const range = { left, width: minWidth };
    this._range._area = clampRange(range, maxWidth, minWidth);
    this._zone.onMicrotaskEmpty
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        if (this._range) {
          this._range.focus();
        }
      });
  }

  /** Toggles the timestamp and sets it programmatically with the provided value */
  private _setTimestamp(position: number): void {
    if (!this._timestamp) {
      return;
    }
    this._closeOverlay();
    this._toggleTimestamp(true);
    this._timestamp._position = position;
    this._zone.onMicrotaskEmpty
      .pipe(
        take(1),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        if (this._timestamp) {
          this._timestamp.focus();
        }
      });
  }

  /**
   * Creates a flexible position strategy for the selection area overlay.
   * @param ref ElementRef of the timestamp or range to center the overlay
   */
  private _calculateOverlayPosition(
    ref: ElementRef<HTMLElement>,
  ): DtFlexibleConnectedPositionStrategy {
    const positionStrategy = new DtFlexibleConnectedPositionStrategy(
      ref,
      this._viewportRuler,
      this._document,
      this._platform,
      this._overlayContainer,
    )
      // .withViewportMargin(20)
      .withPositions(DT_SELECTION_AREA_OVERLAY_POSITIONS)
      .withPush(false)
      .withLockedPosition(false);

    // const positionStrategy = this._overlay
    //   .position()
    //   // Create position attached to the ref of the timestamp or range
    //   .flexibleConnectedTo(ref)
    //   // Attach overlay's center bottom point to the
    //   // top center point of the timestamp or range.
    //   .withPositions(DT_SELECTION_AREA_OVERLAY_POSITIONS)
    //   .setOrigin(ref)
    //   .withPush(false)
    //   .withLockedPosition(false);

    return positionStrategy;
  }

  /**
   * Creates a new Overlay for the range or timestamp with the provided template
   * and positions it connected to the provided ref (range or timestamp).
   */
  private _createOverlay<T>(
    template: TemplateRef<T>,
    ref: ElementRef<HTMLElement>,
    viewRef: ViewContainerRef,
  ): void {
    // create a new overlay configuration with a position strategy that connects
    // to the provided ref.
    // The overlay should be repositioned on scroll.
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._calculateOverlayPosition(ref),
      backdropClass: 'dt-no-pointer',
      hasBackdrop: true,
      panelClass: ['dt-chart-selection-area-overlay'],
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });

    const overlayRef = this._overlay.create(overlayConfig);

    // create the portal out of the template and the containerRef
    this._portal = new TemplatePortal(template, viewRef);
    // attach the portal to the overlay ref
    overlayRef.attach(this._portal);

    this._overlayRef = overlayRef;

    if (!this._overlayFocusTrap) {
      this._overlayFocusTrap = this._focusTrapFactory.create(
        this._overlayRef.overlayElement,
      );
      this._attachFocusTrapListeners();
    }
  }

  /** Updates or creates an overlay for the range or timestamp. */
  private _updateOrCreateOverlay<T = unknown>(
    template: TemplateRef<T>,
    ref: ElementRef<HTMLElement>,
    viewRef: ViewContainerRef,
  ): void {
    if (this._portal && this._overlayRef) {
      // We already have an overlay so update the position
      this._overlayRef.updatePositionStrategy(
        this._calculateOverlayPosition(ref),
      );
    } else {
      this._createOverlay<T>(template, ref, viewRef);
    }
  }

  /** If there is an overlay open it will dispose it and destroy it */
  private _closeOverlay(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }

    // if we have a focus trap we have to destroy it
    if (this._overlayFocusTrap) {
      this._overlayFocusTrap.destroy();
    }

    this._overlayFocusTrap = null;
    this._overlayRef = null;
    this._portal = null;
  }

  /** Main method that initializes all streams and subscribe to the initial behavior of the selection area */
  private _initializeSelectionArea(): void {
    // If there is no Highcharts plot background something went wrong with the chart and we cannot calculate
    // the positions in case that they are all relative to the plot background and not to the chart.
    // The plot background is the area without the axis description only the chart itself.
    if (!this._plotBackground) {
      throw getDtNoPlotBackgroundError();
    }

    const yAxisGrids = [].slice.call(
      this._chart.container.nativeElement.querySelectorAll(
        HIGHCHARTS_Y_AXIS_GRID,
      ),
    );
    const xAxisGrids = [].slice.call(
      this._chart.container.nativeElement.querySelectorAll(
        HIGHCHARTS_X_AXIS_GRID,
      ),
    );
    const seriesGroup = this._chart.container.nativeElement.querySelector(
      HIGHCHARTS_SERIES_GROUP,
    );

    // select all elements where we have to capture the mousemove when pointer events are
    // disabled on the selection area.
    this._mouseDownElements = [
      this._plotBackground,
      seriesGroup,
      ...xAxisGrids,
      ...yAxisGrids,
    ];

    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // E V E N T   S T R E A M S
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // The following section is for registering the events that track the mousedown, hover
    // drag and all interactions. This streams are stored in class members.

    // stream that emits a touch start on all mouse down elements
    const touchStart$ = getTouchStartStream(
      this._elementRef.nativeElement,
      this._mouseDownElements,
    );
    const touchEnd$ = getTouchEndStream(this._elementRef.nativeElement);

    this._mousedown$ = getMouseDownStream(
      this._elementRef.nativeElement,
      this._mouseDownElements,
    );

    this._mouseup$ = getMouseUpStream(this._elementRef.nativeElement);

    this._click$ = merge(
      getClickStream(
        this._elementRef.nativeElement,
        this._mousedown$,
        this._mouseup$,
      ),
      getTouchStream(
        this._elementRef.nativeElement,
        touchStart$,
        getTouchEndStream(
          this._elementRef.nativeElement,
          captureAndMergeEvents('touchend', this._mouseDownElements),
        ),
        getTouchMove(this._mouseDownElements),
      ),
    );

    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // T I M E S T A M P
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // if we have a timestamp component inside the chart we have to update the position
    // every time there is a click with the relative mouse position on the xAxis.
    if (this._timestamp) {
      this._click$.pipe(takeUntil(this._destroy$)).subscribe(({ x }) => {
        if (this._timestamp) {
          this._timestamp._position = x;
        }
      });

      // after a click happened and the timestamp is visible in the queryList we focus the timestamp
      this._click$
        .pipe(
          switchMap(() => this._timestamp!._timestampElementRef.changes),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          if (this._timestamp) {
            this._timestamp.focus();
          }
        });

      this._timestamp._switchToRange
        .pipe(takeUntil(this._destroy$))
        .subscribe((left: number) => {
          this._setRange(left);
        });
    }

    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // R A N G E
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // If there is a range component we have to check for drag events and resizing
    // and updates of the range.
    if (this._range) {
      // touch factory on the window that creates a touchmove
      const touch = fromEvent<TouchEvent>(window, 'touchmove');

      this._drag$ = merge(
        getDragStream(
          this._elementRef.nativeElement,
          this._mousedown$,
          this._mouseup$,
        ),
        getDragStream(
          this._elementRef.nativeElement,
          touchStart$,
          touchEnd$,
          touch,
        ),
      );

      // Create a stream for drag handle event in case we have to block the click event
      // with an event prevent default inside the range component. Therefore we emit the
      // dragHandleStart$ stream to notify when a drag on a handle happens.
      const dragStart$ = this._range._handleDragStarted.pipe(
        tap(() => {
          removeCssClass(
            this._elementRef.nativeElement,
            NO_POINTER_EVENTS_CLASS,
          );
        }),
      );

      this._dragHandle$ = merge(
        getDragStream(
          this._elementRef.nativeElement,
          dragStart$,
          this._mouseup$,
        ),
        getDragStream(
          this._elementRef.nativeElement,
          dragStart$,
          touchEnd$,
          touch,
        ),
      );

      const relativeTouchOrMouseDown = <T extends TouchEvent | MouseEvent>(
        event$: Observable<T>,
      ) =>
        event$.pipe(
          map((event: T) =>
            getRelativeMousePosition(event, this._elementRef.nativeElement),
          ),
        );

      // Create a range on the selection area if a drag is happening.
      // and listen for resizing of an existing selection area
      merge(
        getRangeCreateStream(
          merge(
            relativeTouchOrMouseDown(this._mousedown$),
            relativeTouchOrMouseDown(touchStart$),
          ),
          this._drag$,
          this._selectionAreaBcr!.width,
        ),
        // update a selection area according to a resize through the side handles
        getRangeResizeStream(
          this._dragHandle$,
          this._range._handleDragStarted.pipe(distinctUntilChanged()),
          this._selectionAreaBcr!.width,
          () => this._range!._area,
          (start: number, end: number) =>
            this._range!._isRangeValid(start, end),
          (left: number, width: number) =>
            this._range!._getRangeValuesFromPixels(left, width),
        ),
      )
        .pipe(
          takeUntil(this._destroy$),
          filter(area => this._isRangeInsideMaximumConstraint(area)),
        )
        .subscribe(area => {
          if (this._range) {
            this._range._area = area;
          }
        });

      this._range._switchToTimestamp
        .pipe(takeUntil(this._destroy$))
        .subscribe((position: number) => {
          this._setTimestamp(position);
        });

      this._zone.runOutsideAngular(() => {
        const dragHandleStart$ = this._dragHandle$.pipe(mapTo(1));
        const initialDragStart$ = this._drag$.pipe(mapTo(0));
        // merge the streams of the initial drag start and the handle drag start
        const startResizing$ = merge(initialDragStart$, dragHandleStart$);
        // map to false to end the resize
        const release$ = merge(this._mouseup$, touchEnd$).pipe(mapTo(-1));

        // mouse Release is -1
        const isMouseRelease = (resize: number) => resize === -1;

        // stream that emits drag start end end
        merge(startResizing$, release$)
          .pipe(
            distinctUntilChanged(),
            takeUntil(this._destroy$),
          )
          .subscribe((resize: number) => {
            // show drag arrows on drag release but only if the stream is not a drag handle
            // 0 is initial drag and -1 is mouse release
            if (this._range && resize < 1) {
              this._range._reflectRangeReleased(isMouseRelease(resize));

              // if the drag is completed we can emit a stateChanges
              if (isMouseRelease(resize)) {
                this._range._emitDragEnd();
                this._range.focus();
              }
            }

            // every drag regardless of if it is a handle or initial drag should have the grab cursors
            if (resize >= 0) {
              addCssClass(this._elementRef.nativeElement, GRAB_CURSOR_CLASS);
            } else {
              removeCssClass(this._elementRef.nativeElement, GRAB_CURSOR_CLASS);
            }
          });
      });
    }

    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // T I M E S T A M P  +  R A N G E
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // Decide weather to show the range or a timestamp according to a click or a drag.
    // On a mousedown the range and the timestamp have to be hidden.
    const startShowingTimestamp$ = this._click$.pipe(mapTo(true));
    const startShowingRange$ = this._drag$.pipe(mapTo(true));
    const hideTimestampAndRange$ = merge(this._mousedown$, touchStart$).pipe(
      mapTo(false),
    );

    merge(startShowingRange$, hideTimestampAndRange$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroy$),
      )
      .subscribe((show: boolean) => {
        this._toggleRange(show);
      });

    merge(startShowingTimestamp$, hideTimestampAndRange$)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroy$),
      )
      .subscribe((show: boolean) => {
        this._toggleTimestamp(show);
      });

    // Reset range or timestamp if one of each triggers a stateChanges and is now visible
    // the other one has to be hidden then. There can only be one of both.
    if (this._timestamp && this._range) {
      merge(
        this._timestamp._stateChanges.pipe(
          map(v => ({ ...v, type: 'timestamp' })),
        ),
        this._range._stateChanges.pipe(map(v => ({ ...v, type: 'range' }))),
      )
        .pipe(
          takeUntil(this._destroy$),
          filter(event => !event.hidden),
          distinctUntilChanged(),
        )
        .subscribe(state => {
          if (this._range && state.type === 'timestamp') {
            this._range._reset();
          }

          if (this._timestamp && state.type === 'range') {
            this._timestamp._reset();
          }
        });
    }

    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // O V E R L A Y
    // –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    // listen for a _closeOverlay event if there is a timestamp or a range
    merge(
      this._timestamp ? this._timestamp._closeOverlay : of(null),
      this._range ? this._range._closeOverlay : of(null),
      this._mousedown$,
      touchStart$,
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._closeOverlay();
      });

    // handling of the overlay for the range
    if (this._range) {
      getElementRefStream<HTMLDivElement>(
        this._range._stateChanges,
        this._destroy$,
        this._range._rangeElementRef,
        this._zone,
      ).subscribe(ref => {
        if (this._range && this._range._overlayTemplate) {
          this._updateOrCreateOverlay(
            this._range._overlayTemplate,
            ref,
            this._range._viewContainerRef,
          );
        }
      });

      // On dragHandle we want to reposition the overlay with a small delay and an animationFrameScheduler
      this._dragHandle$
        .pipe(
          throttleTime(0, animationFrameScheduler),
          getElementRef(this._range._rangeElementRef),
          takeUntil(this._destroy$),
        )
        .subscribe(ref => {
          if (this._range && this._range._overlayTemplate) {
            this._updateOrCreateOverlay(
              this._range._overlayTemplate,
              ref,
              this._range._viewContainerRef,
            );
          }
        });
    }

    // handling of the overlay for the timestamp
    if (this._timestamp) {
      getElementRefStream<HTMLDivElement>(
        this._timestamp._stateChanges,
        this._destroy$,
        this._timestamp._timestampElementRef,
        this._zone,
      ).subscribe(ref => {
        if (this._timestamp && this._timestamp._overlayTemplate) {
          this._updateOrCreateOverlay(
            this._timestamp._overlayTemplate,
            ref,
            this._timestamp._viewContainerRef,
          );
        }
      });
    }
  }

  /** initializes the hairline the light blue line that follows the cursor */
  private _initializeHairline(): void {
    this._zone.runOutsideAngular(() => {
      // hover is used to capture the mousemove on the selection area when pointer events
      // are disabled. So it collects all underlying areas and captures the mousemove
      const hover$ = getMouseMove(
        this._elementRef.nativeElement,
        this._mouseDownElements,
      );

      const mouseOut$ = getMouseOutStream(
        this._elementRef.nativeElement,
        this._mouseDownElements,
        this._selectionAreaBcr!,
      );

      const showHairline$ = hover$.pipe(mapTo(true));
      const hideHairline$ = merge(
        this._range ? this._mousedown$ : of(null),
        this._dragHandle$,
        mouseOut$,
      ).pipe(mapTo(false));

      merge(showHairline$, hideHairline$)
        .pipe(
          distinctUntilChanged(),
          takeUntil(this._destroy$),
        )
        .subscribe((show: boolean) => {
          this._toggleHairline(show);
        });

      hover$
        .pipe(
          map(({ x }) => x),
          distinctUntilChanged(), // only emit when the x value changes ignore hover on yAxis with that.
          takeUntil(this._destroy$),
        )
        .subscribe((x: number) => {
          this._reflectHairlinePositionToDom(x);
        });
    });
  }

  /** Attaches the event listeners for the focus traps connected to each other */
  private _attachFocusTrapListeners(): void {
    this._zone.runOutsideAngular(() => {
      if (!this._overlayFocusTrap || !this._overlayRef) {
        return;
      }

      const traps = [this._overlayFocusTrap];
      const anchors = [this._overlayRef.hostElement];

      if (this._range && this._range._rangeElementRef.first) {
        traps.push(this._range._selectedAreaFocusTrap.focusTrap);
        anchors.push(this._range._viewContainerRef.element.nativeElement);
      }

      if (this._timestamp && this._timestamp._timestampElementRef.first) {
        traps.push(this._timestamp._selectedFocusTrap.focusTrap);
        anchors.push(this._timestamp._viewContainerRef.element.nativeElement);
      }

      chainFocusTraps(traps, anchors);
    });
  }

  /** Filter function to check if the created range meets the maximum constraints */
  private _isRangeInsideMaximumConstraint(range: {
    left: number;
    width: number;
  }): boolean {
    if (this._range && this._range._pixelsToValue) {
      // if the range has no max provided every value is okay and we don't need to filter.
      if (!this._range.max) {
        return true;
      }
      const left = this._range._pixelsToValue(range.left);
      const width = this._range._pixelsToValue(range.width);

      return this._range.max >= width - left;
    }
    return false;
  }

  /** Function that toggles the visibility of the hairline (line that follows the mouses) */
  private _toggleHairline(show: boolean): void {
    const display = show ? 'inherit' : 'none';
    this._renderer.setStyle(this._hairline.nativeElement, 'display', display);
  }

  /** Function that safely toggles the visible state of the range */
  private _toggleRange(show: boolean): void {
    if (this._range) {
      this._range._hidden = !show;
    }
  }

  /** Function that safely toggles the visible state of the timestamp */
  private _toggleTimestamp(show: boolean): void {
    if (this._timestamp) {
      this._timestamp._hidden = !show;
    }
  }

  /** reflects the position of the timestamp to the element */
  private _reflectHairlinePositionToDom(x: number): void {
    this._renderer.setStyle(
      this._hairline.nativeElement,
      'transform',
      `translateX(${x}px)`,
    );
  }

  /** Set the position of the select-able area to the size of the highcharts plot background */
  private _updateSelectionAreaSize(): void {
    if (!this._plotBackground) {
      throw getDtNoPlotBackgroundError();
    }

    // get Bounding client Rects of the plot background and the host to calculateRelativeXPos
    // a relative offset.
    const hostBCR = getElementBoundingClientRect(this._chart._elementRef);
    const plotBCR = getElementBoundingClientRect(this._plotBackground);

    const topOffset = plotBCR.top - hostBCR.top;
    const leftOffset = plotBCR.left - hostBCR.left;

    setPosition(this._elementRef.nativeElement, {
      top: topOffset,
      left: leftOffset,
      width: plotBCR.width,
      height: plotBCR.height,
    });
  }
}
