import {
  coerceBooleanProperty,
  coerceNumberProperty,
} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';

import { DtDrawer } from './drawer';
import { dtDrawerAnimation } from './drawer-animation';

@Directive({
  selector: 'dt-sidenav-header',
  exportAs: 'dtCardTitle',
  host: {
    class: 'dt-sidenav-header-title',
  },
})
export class DtSidenavHeader {}

@Component({
  moduleId: module.id,
  selector: 'dt-sidenav',
  exportAs: 'dtSidenav',
  templateUrl: 'sidenav.html',
  styleUrls: ['sidenav.scss'],
  animations: dtDrawerAnimation,
  host: {
    class: 'dt-sidenav dt-drawer',
    tabIndex: '-1',
    '[@transform]': '_animationState',
    '(@transform.start)': '_animationStarted.next($event)',
    '(@transform.done)': '_animationEnd.next($event)',
    '[class.dt-drawer-end]': 'position === "end"',
    '[class.dt-drawer-over]': '_currentMode === "over"',
    '[class.dt-drawer-side]': '_currentMode === "side"',
    '[attr.aria-hidden]': '!opened ? true : null',
    '[class.dt-sidenav-fixed]': 'fixedInViewport',
    '[style.top.px]': 'fixedInViewport ? fixedTopGap : null',
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtSidenav extends DtDrawer {
  /** Whether the sidenav is fixed in the viewport. */
  @Input()
  get fixedInViewport(): boolean {
    return this._fixedInViewport;
  }
  set fixedInViewport(value: boolean) {
    this._fixedInViewport = coerceBooleanProperty(value);
  }
  private _fixedInViewport = false;

  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  @Input()
  get fixedTopGap(): number {
    return this._fixedTopGap;
  }
  set fixedTopGap(value: number) {
    this._fixedTopGap = coerceNumberProperty(value);
  }
  private _fixedTopGap = 0;
}
