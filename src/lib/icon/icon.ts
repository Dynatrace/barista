import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Attribute,
  ElementRef,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { take } from 'rxjs/operators/take';
import { DtIconRegistry } from './icon-registry';
import { DtIconType } from './icon-types';
import {
  DtThemePalette,
  setComponentColorClasses
} from '../core/index';
// Importing Contructor by its own, because it is not exported in core (and should not be exported)
import { Constructor } from '../core/common-behaviours/constructor';
import { Platform } from '@angular/cdk/platform';

export type DtIconColorPalette = DtThemePalette | 'light' | 'dark';

@Component({
  moduleId: module.id,
  selector: 'dt-icon',
  exportAs: 'dtIcon',
  template: '<ng-content></ng-content>',
  styleUrls: ['icon.scss'],
  host: {
    role: 'img',
    class: 'dt-icon',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Disabled view encapsulation because we need to access and style
  // the dynamically loaded and generated svg elements.
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class DtIcon implements OnChanges {

  /** Name of the icon in the registry. */
  @Input() name: DtIconType;

  /**
   * Fill color of the svg icon.
   * We can not use the color mixin here because icon has a special extended set of colors.
   */
  @Input()
  get color(): DtIconColorPalette { return this._color; }
  set color(value: DtIconColorPalette) {
    if (value !== this._color) {
      setComponentColorClasses(this, value);
      this._color = value;
    }
  }
  private _color: DtIconColorPalette;

  constructor(
    public _elementRef: ElementRef,
    private _iconRegistry: DtIconRegistry,
    private _plateform: Platform,
    @Attribute('aria-hidden') ariaHidden: string
  ) {
    // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
    // the right thing to do for the majority of icon use-cases.
    if (!ariaHidden) {
      _elementRef.nativeElement.setAttribute('aria-hidden', 'true');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && this._plateform.isBrowser) {
      if (this.name) {
        this._iconRegistry.getNamedSvgIcon(this.name).pipe(take(1)).subscribe(
          (svg) => this._setSvgElement(svg),
          // We do not break the app when an icon could not be loaded
          // so do only a console.log here
          // tslint:disable-next-line:no-console
          (err: Error) => console.log(`Error retrieving icon: ${err.message}`)
        );
      } else {
        this._clearSvgElement();
      }
    }
  }

  private _setSvgElement(svg: SVGElement): void {
    this._clearSvgElement();
    this._elementRef.nativeElement.appendChild(svg);
  }

  private _clearSvgElement(): void {
    const layoutElement: HTMLElement = this._elementRef.nativeElement;
    const childCount = layoutElement.childNodes.length;

    // Remove existing child nodes and add the new SVG element. Note that we can't
    // use innerHTML, because IE will throw if the element has a data binding.
    for (let i = 0; i < childCount; i++) {
      layoutElement.removeChild(layoutElement.childNodes[i]);
    }
  }
}
