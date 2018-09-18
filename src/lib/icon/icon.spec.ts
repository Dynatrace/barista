import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import {
  DtIconModule,
  getDtIconNoConfigProviderError,
  getDtIconNoHttpProviderError,
} from '@dynatrace/angular-components';
import { wrappedErrorMessage } from '../../testing/wrapped-error-message';

/**
 * Fake URLs and associated SVG documents used by tests.
 * The ID attribute is used to load the icons, the name attribute is only used for testing.
 */
export const FAKE_SVGS = {
  cat: '<svg><path id="meow" name="meow"></path></svg>',
  dog: '<svg><path id="woof" name="woof"></path></svg>',
  xss: '<svg><script>alert("123")</script><path id="xss" name="xss"></path></svg>',
  xssType: '<svg><script type="text/javascript">alert("123")</script><path id="xss" name="xss"></path></svg>',
  xssMulti: `<svg><script>alert("123")</script><path id="xss" name="xss"></path><script>alert("123")</script></svg>`,
  xssInter: `<svg><scr<script>ipt>alert("123")</scr</script>ipt><path id="xss" name="xss"></path></svg>`,
};

/**
 * Verifies that an element contains a single `<svg>` child element, and returns that child.
 */
function verifyAndGetSingleSvgChild(element: SVGElement): SVGElement {
  expect(element.id).toBeFalsy();
  expect(element.childNodes.length).toBe(1);
  const svgChild = element.childNodes[0] as SVGElement;
  expect(svgChild.tagName.toLowerCase()).toBe('svg');
  return svgChild;
}

describe('DtIcon', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DtIconModule.forRoot({svgIconLocation: `{{name}}.svg`}),
      ],
      declarations: [
        IconWithName,
        IconWithColor,
        IconWithAriaHiddenFalse,
      ],
    });

    TestBed.compileComponents();
  }));

  let http: HttpTestingController;

  beforeEach(inject([HttpTestingController], (h: HttpTestingController) => {
    http = h;
  }));

  it('should apply class based on color attribute', () => {
    const fixture = TestBed.createComponent(IconWithColor);

    const testComponent = fixture.componentInstance;
    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    testComponent.iconName = 'home';
    testComponent.iconColor = 'main';
    fixture.detectChanges();
    expect(iconElement.classList).toContain('dt-color-main');
  });

  it('should update class on new color attribute', () => {
    const fixture = TestBed.createComponent(IconWithColor);

    const testComponent = fixture.componentInstance;
    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    testComponent.iconName = 'home';
    testComponent.iconColor = 'cta';
    fixture.detectChanges();
    expect(iconElement.classList).toContain('dt-color-cta');
  });

  it('colors from the extended color palette', () => {
    const fixture = TestBed.createComponent(IconWithColor);

    const testComponent = fixture.componentInstance;
    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    testComponent.iconName = 'home';
    testComponent.iconColor = 'light';
    fixture.detectChanges();
    expect(iconElement.classList).toContain('dt-color-light');
    testComponent.iconColor = 'dark';
    fixture.detectChanges();
    expect(iconElement.classList).toContain('dt-color-dark');
  });

  it('should mark dt-icon as aria-hidden by default', () => {
    const fixture = TestBed.createComponent(IconWithName);
    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    expect(iconElement.getAttribute('aria-hidden'))
      .toBe('true', 'Expected the dt-icon element has aria-hidden="true" by default');
  });

  it('should not override a user-provided aria-hidden attribute', () => {
    const fixture = TestBed.createComponent(IconWithAriaHiddenFalse);
    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    expect(iconElement.getAttribute('aria-hidden'))
      .toBe('false', 'Expected the dt-icon element has the user-provided aria-hidden value');
  });

  it('should clear the id attribute from the svg node', () => {
    const fixture = TestBed.createComponent(IconWithName);

    fixture.componentInstance.iconName = 'cat';
    fixture.detectChanges();
    http.expectOne('cat.svg').flush(FAKE_SVGS.cat);

    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    const svgElement = verifyAndGetSingleSvgChild(iconElement);

    expect(svgElement.hasAttribute('id')).toBe(false);
  });

  it('should remove the SVG element from the DOM when the binding is cleared', () => {
    const fixture = TestBed.createComponent(IconWithName);

    fixture.componentInstance.iconName = 'cat';
    fixture.detectChanges();
    http.expectOne('cat.svg').flush(FAKE_SVGS.cat);

    const testComponent = fixture.componentInstance;
    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');

    expect(iconElement.querySelector('svg')).toBeTruthy();

    testComponent.iconName = undefined;
    fixture.detectChanges();

    expect(iconElement.querySelector('svg')).toBeFalsy();
  });

  it('should remove script tags without type from the svg node', () => {
    const fixture = TestBed.createComponent(IconWithName);

    fixture.componentInstance.iconName = 'xss';
    fixture.detectChanges();
    http.expectOne('xss.svg').flush(FAKE_SVGS.xss);

    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    const svgElement = verifyAndGetSingleSvgChild(iconElement);

    expect(svgElement.querySelector('script')).toBeNull();
  });

  it('should remove script tags with type from the svg node', () => {
    const fixture = TestBed.createComponent(IconWithName);

    fixture.componentInstance.iconName = 'xssType';
    fixture.detectChanges();
    http.expectOne('xssType.svg').flush(FAKE_SVGS.xssType);

    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    const svgElement = verifyAndGetSingleSvgChild(iconElement);

    expect(svgElement.querySelector('script')).toBeNull();
  });

  it('should remove multiple script tags from the svg node', () => {
    const fixture = TestBed.createComponent(IconWithName);

    fixture.componentInstance.iconName = 'xssMulti';
    fixture.detectChanges();
    http.expectOne('xssMulti.svg').flush(FAKE_SVGS.xssMulti);

    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    const svgElement = verifyAndGetSingleSvgChild(iconElement);

    expect(svgElement.querySelector('script')).toBeNull();
  });

  it('should remove script tags from the svg node that are in tags', () => {
    const fixture = TestBed.createComponent(IconWithName);

    fixture.componentInstance.iconName = 'xssInter';
    fixture.detectChanges();
    http.expectOne('xssInter.svg').flush(FAKE_SVGS.xssMulti);

    const iconElement = fixture.debugElement.nativeElement.querySelector('dt-icon');
    const svgElement = verifyAndGetSingleSvgChild(iconElement);

    expect(svgElement.querySelector('script')).toBeNull();
  });
});

describe('DtIcon without config', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DtIconModule],
      declarations: [IconWithName],
    });

    TestBed.compileComponents();
  }));

  it('should throw an error when trying to load a remote icon', async () => {
    const expectedError = wrappedErrorMessage(getDtIconNoConfigProviderError());

    expect(() => {
      const fixture = TestBed.createComponent(IconWithName);

      fixture.componentInstance.iconName = 'cat';
      fixture.detectChanges();
    }).toThrowError(expectedError);
  });
});

describe('DtIcon without HttpClientModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DtIconModule.forRoot({svgIconLocation: `{{name}}.svg`})],
      declarations: [IconWithName],
    });

    TestBed.compileComponents();
  }));

  it('should throw an error when trying to load a remote icon', async () => {
    const expectedError = wrappedErrorMessage(getDtIconNoHttpProviderError());

    expect(() => {
      const fixture = TestBed.createComponent(IconWithName);

      fixture.componentInstance.iconName = 'cat';
      fixture.detectChanges();
    }).toThrowError(expectedError);
  });
});

@Component({
  template: `<dt-icon [name]="iconName"></dt-icon>`,
})
class IconWithName {
  iconName: string | undefined = '';
}

@Component({
  template: `<dt-icon name="agent" [color]="iconColor">{{iconName}}</dt-icon>`,
})
class IconWithColor {
  iconName = '';
  iconColor = 'main';
}

@Component({
  template: '<dt-icon name="agent" aria-hidden="false">face</dt-icon>',
})
class IconWithAriaHiddenFalse {
}
