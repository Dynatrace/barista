import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  DtPaginationModule,
  DtPagination,
  DtIconModule,
} from '@dynatrace/angular-components';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ARIA_DEFAULT_LABEL,
  ARIA_DEFAULT_NEXT_LABEL,
  ARIA_DEFAULT_PAGE_LABEL,
  ARIA_DEFAULT_PREVIOUS_LABEL,
  ARIA_DEFAULT_CURRENT_LABEL,
  ARIA_DEFAULT_ELLIPSES,
} from './pagination-defaults';
import { dispatchFakeEvent } from '../../testing/dispatch-events';

describe('DtPagination', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DtPaginationModule,
        HttpClientModule,
        DtIconModule.forRoot({ svgIconLocation: `{{name}}.svg` }),
      ],
      declarations: [
        EmptyPagination,
        DefaultPagination,
        PaginationTestComponent,
        LegacyPagination,
      ],
    });

    TestBed.compileComponents();
  }));

  describe('initialization without any pages', () => {
    it('should create the pagination element without any pages inside, only with arrows', () => {
      const fixture = TestBed.createComponent(EmptyPagination);
      const containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      fixture.detectChanges();

      const listItems = containerEl.querySelectorAll('li');
      expect(listItems.length).toBe(2);
      expect(listItems[0].classList.contains('dt-pagination-previous')).toBeTruthy();
      expect(listItems[1].classList.contains('dt-pagination-next')).toBeTruthy();
    });

    it('should disable both arrows when no data is there', () => {
      const fixture = TestBed.createComponent(EmptyPagination);
      const containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      fixture.detectChanges();

      const buttons = containerEl.querySelectorAll('button');
      expect(buttons.length).toBe(2);
      expect(buttons[0].getAttribute('disabled')).toBe('');
      expect(buttons[0].getAttribute('aria-disabled')).toBeTruthy();
      expect(buttons[1].getAttribute('disabled')).toBe('');
      expect(buttons[1].getAttribute('aria-disabled')).toBeTruthy();
    });
  });

  /** TODO: @breaking-change 3.0.0 – remove those tests */
  describe('legacy functionality', () => {

    it('should work with the old API as well', () => {
      const fixture = TestBed.createComponent(LegacyPagination);
      const nextButton = fixture.debugElement.nativeElement.querySelector('.dt-pagination-next button');
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(instance.pagination._pages).toEqual([[1, 2, 3], [8, 9, 10]]);
      expect(instance.pagination.currentPage).toBe(1);

      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(2);

      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(3);
      expect(instance.pagination._pages).toEqual([[1, 2, 3, 4], [9, 10]]);

    });
  });

  describe('functionality of navigating through the pagination', () => {

    it('should create an empty pagination', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      fixture.detectChanges();
      const containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      const items = containerEl.querySelectorAll('li');
      expect(items.length).toBe(2);
    });

    it('create pagination and add a length, pageSize should be defaulted', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      fixture.detectChanges();
      let containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      let items = containerEl.querySelectorAll('.dt-pagination-item > *');
      expect(items.length).toBe(0);

      instance.length = 100;
      fixture.detectChanges();
      containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      items = containerEl.querySelectorAll('.dt-pagination-item > *');

      expect(items.length).toBe(2);
      expect(instance.pagination.pageSize).toBe(50);
      expect(instance.pagination.currentPage).toBe(1);
    });

    it('should navigate programmatically', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 120;
      instance.pageSize = 10;
      fixture.detectChanges();

      expect(instance.pagination.currentPage).toBe(1);
      expect(instance.pagination.numberOfPages).toBe(12);

      instance.pagination.next();
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(2);

      instance.pagination.previous();
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(1);

      instance.currentPage = 5;
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(5);
    });

    it('should navigate with the click on the arrows', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 120;
      instance.pageSize = 10;
      fixture.detectChanges();

      expect(instance.pagination.currentPage).toBe(1);

      const prevButton = fixture.debugElement.nativeElement.querySelector('.dt-pagination-previous button');
      const nextButton = fixture.debugElement.nativeElement.querySelector('.dt-pagination-next button');

      dispatchFakeEvent(prevButton, 'click');
      fixture.detectChanges();
      // nothing should happen the prev button is disabled!
      expect(instance.pagination.currentPage).toBe(1);
      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(2);
      dispatchFakeEvent(prevButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(1);

      instance.currentPage = 12;
      fixture.detectChanges();
      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      // nothing should happen the next button is disabled!
      expect(instance.pagination.currentPage).toBe(12);
    });

    it('should navigate with the click on the numbers', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 120;
      instance.pageSize = 10;
      fixture.detectChanges();

      expect(instance.pagination.currentPage).toBe(1);
      const page1 = fixture.debugElement.nativeElement.querySelector('.dt-pagination-item button');
      dispatchFakeEvent(page1, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(2);

      // 4th element is the page 3
      const page2 = fixture.debugElement.nativeElement.querySelector('.dt-pagination-item:nth-child(4) button');
      dispatchFakeEvent(page2, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(3);
    });

    it('should disable the previous and next button when the current page is at the start or end', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 120;
      instance.pageSize = 10;
      fixture.detectChanges();

      const buttons = fixture.debugElement.nativeElement.querySelectorAll('[dt-icon-button]');
      expect(buttons[0].getAttribute('aria-disabled')).toBeTruthy();
      expect(buttons[1].getAttribute('aria-disabled')).toBe('false');

      instance.currentPage = 12;
      fixture.detectChanges();

      expect(buttons[0].getAttribute('aria-disabled')).toBe('false');
      expect(buttons[1].getAttribute('aria-disabled')).toBeTruthy();
    });

    it('should fire an event if the currentPage changes that emits tha new page number', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 120;
      instance.pageSize = 10;

      expect(instance.currentSelection).toBe(0);
      expect(instance.firedEvents).toBe(0);
      expect(instance.pagination.currentPage).toBe(1);
      fixture.detectChanges();

      const previous = fixture.debugElement.nativeElement.querySelector('.dt-pagination-previous button');
      const next = fixture.debugElement.nativeElement.querySelector('.dt-pagination-next button');

      dispatchFakeEvent(next, 'click');
      fixture.detectChanges();
      expect(instance.currentSelection).toBe(2);
      expect(instance.firedEvents).toBe(1);

      dispatchFakeEvent(previous, 'click');
      fixture.detectChanges();
      expect(instance.currentSelection).toBe(1);
      expect(instance.firedEvents).toBe(2);
    });

    it('should update the pages when navigating with the arrows', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 100;
      instance.pageSize = 10;
      fixture.detectChanges();

      const nextButton = fixture.debugElement.nativeElement.querySelector('.dt-pagination-next button');

      expect(instance.pagination.currentPage).toBe(1);
      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(2);
      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(3);
      expect(instance.pagination._pages).toEqual([[1, 2, 3, 4], [9, 10]]);
      dispatchFakeEvent(nextButton, 'click');
      fixture.detectChanges();
      expect(instance.pagination.currentPage).toBe(4);
      expect(instance.pagination._pages).toEqual([[1], [3, 4, 5], [10]]);
    });
  });

  describe('accessibility', () => {

    it('should have default aria-labels', () => {
      const fixture = TestBed.createComponent(DefaultPagination);
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      const previous = containerEl.querySelector('.dt-pagination-previous button');
      const next = containerEl.querySelector('.dt-pagination-next button');
      const items = containerEl.querySelectorAll('.dt-pagination-item > *');

      expect(containerEl.getAttribute('aria-label')).toBe(ARIA_DEFAULT_LABEL);
      expect(previous.getAttribute('aria-label')).toBe(ARIA_DEFAULT_PREVIOUS_LABEL);
      expect(next.getAttribute('aria-label')).toBe(ARIA_DEFAULT_NEXT_LABEL);

      expect(items[0].getAttribute('aria-label')).toBe(`${ARIA_DEFAULT_CURRENT_LABEL} 1`);
      expect(items[0].getAttribute('aria-current')).toBe('');
      expect(items[1].getAttribute('aria-label')).toBe(`${ARIA_DEFAULT_PAGE_LABEL} 2`);
      expect(items[2].getAttribute('aria-label')).toBe(`${ARIA_DEFAULT_PAGE_LABEL} 3`);
      expect(items[3].getAttribute('aria-label')).toBe(ARIA_DEFAULT_ELLIPSES);
      expect(items[4].getAttribute('aria-label')).toBe(`${ARIA_DEFAULT_PAGE_LABEL} 8`);
      expect(items[5].getAttribute('aria-label')).toBe(`${ARIA_DEFAULT_PAGE_LABEL} 9`);
      expect(items[6].getAttribute('aria-label')).toBe(`${ARIA_DEFAULT_PAGE_LABEL} 10`);
    });

    it('should update the binding of the aria-label', () => {
      const fixture = TestBed.createComponent(PaginationTestComponent);
      const instance = fixture.componentInstance;
      instance.length = 100;
      instance.pageSize = 10;
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.dt-pagination-list')).nativeElement;
      const previous = containerEl.querySelector('.dt-pagination-previous button');
      const next = containerEl.querySelector('.dt-pagination-next button');
      const items = containerEl.querySelectorAll('.dt-pagination-item > *');

      expect(containerEl.getAttribute('aria-label')).toBeNull();
      expect(previous.getAttribute('aria-label')).toBeNull();
      expect(next.getAttribute('aria-label')).toBeNull();

      instance.ariaLabel = 'paginación';
      instance.ariaNextLabel = 'siguiente página';
      instance.ariaPreviousLabel = 'pagina anterior';
      instance.ariaPageLabel = 'página';
      instance.ariaCurrentLabel = 'estas en la pagina';
      instance.ariaEllipses = 'las siguientes paginas son elipses';
      fixture.detectChanges();

      expect(containerEl.getAttribute('aria-label')).toBe('paginación');
      expect(previous.getAttribute('aria-label')).toBe('pagina anterior');
      expect(next.getAttribute('aria-label')).toBe('siguiente página');
      expect(items[0].getAttribute('aria-label')).toBe('estas en la pagina 1');
      expect(items[0].getAttribute('aria-current')).toBe('');
      expect(items[1].getAttribute('aria-label')).toBe('página 2');
      expect(items[3].getAttribute('aria-label')).toBe('las siguientes paginas son elipses');
      expect(items[6].getAttribute('aria-label')).toBe('página 10');
    });
  });
});

@Component({
  selector: 'test-app',
  template: `<dt-pagination></dt-pagination>`,
})
export class EmptyPagination {}

@Component({
  selector: 'test-app',
  template: `<dt-pagination maxPages="10" #pagination></dt-pagination>`,
})
export class LegacyPagination {
  @ViewChild('pagination', { static: true }) pagination: DtPagination;
}

@Component({
  selector: 'pagination-test-component',
  template: `<dt-pagination [length]="length" [pageSize]="pageSize"></dt-pagination>`,
})
export class DefaultPagination {
  length = 100;
  pageSize = 10;
}

@Component({
  selector: 'pagination-test-component',
  template: `<dt-pagination
              #pagination
              [length]="length"
              [pageSize]="pageSize"
              [currentPage]="currentPage"
              [aria-label-previous]="ariaPreviousLabel"
              [aria-label-next]="ariaNextLabel"
              [aria-label]="ariaLabel"
              [aria-label-ellipses]="ariaEllipses"
              [aria-label-page]="ariaPageLabel"
              [aria-label-current]="ariaCurrentLabel"
              (changed)="onChange($event)"></dt-pagination>`,
})
export class PaginationTestComponent {
  @ViewChild('pagination', { static: true }) pagination: DtPagination;
  length: number;
  pageSize: number;
  currentPage: number;
  ariaPreviousLabel: string;
  ariaNextLabel: string;
  ariaLabel: string;
  ariaEllipses: string;
  ariaPageLabel: string;
  ariaCurrentLabel: string;

  firedEvents = 0;
  currentSelection = 0;

  onChange(value: number): void {
    this.firedEvents++;
    this.currentSelection = value;
  }
}
