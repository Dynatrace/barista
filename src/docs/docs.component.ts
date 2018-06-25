import { Component, HostListener } from '@angular/core';
import { LocationService } from './core/location.service';
import { DocumentService, DocumentContents } from './core/document.service';

const NAV_ITEMS = [
  { name: 'Alert', route: '/alert' },
  { name: 'Breadcrumbs', route: '/breadcrumbs' },
  { name: 'Button', route: '/button' },
  { name: 'Button Group', route: '/button-group' },
  { name: 'Card', route: '/card' },
  { name: 'Chart', route: '/chart' },
  { name: 'Checkbox', route: '/checkbox' },
  { name: 'Context dialog', route: '/context-dialog' },
  { name: 'Expandable panel', route: '/expandable-panel' },
  { name: 'Expandable section', route: '/expandable-section' },
  { name: 'Inline Editor', route: '/inline-editor' },
  { name: 'Form field', route: '/form-field' },
  { name: 'Icon', route: '/icon' },
  { name: 'Input', route: '/input' },
  { name: 'Link', route: '/style#link' },
  { name: 'Loading distractor', route: '/loading-distractor' },
  { name: 'Pagination', route: '/pagination' },
  { name: 'Progress circle', route: '/progress-circle' },
  { name: 'Radio', route: '/radio' },
  { name: 'Show more', route: '/show-more' },
  { name: 'Styles', route: '/style' },
  { name: 'Table', route: '/table' },
  { name: 'Tag', route: '/tag' },
  { name: 'Tile', route: '/tile' },
];

@Component({
  selector: 'docs-app',
  styleUrls: ['docs.component.scss'],
  templateUrl: 'docs.component.html',
})
export class Docs {
  navItems = NAV_ITEMS;
  selectedTheme = 'turquoise';

  currentDocument: DocumentContents;
  currentPath: string;
  isFetching = false;

  // tslint:disable-next-line:no-any
  private _isFetchingTimeout: any;

  constructor(
    private _locationService: LocationService,
    private _documentService: DocumentService
  ) {
    this._documentService.currentDocument.subscribe((doc) => this.currentDocument = doc);
    this._locationService.currentPath.subscribe((path) => {
      this.currentPath = path;
      // Start progress bar if doc not rendered within brief time
      clearTimeout(this._isFetchingTimeout);
      // tslint:disable-next-line:no-magic-numbers
      this._isFetchingTimeout = setTimeout(() => this.isFetching = true, 200);
    });

  }

  @HostListener('click', ['$event.target', '$event.button', '$event.ctrlKey', '$event.metaKey', '$event.altKey'])
  onClick(eventTarget: HTMLElement, button: number, ctrlKey: boolean, metaKey: boolean, altKey: boolean): boolean {
    // Deal with anchor clicks; climb DOM tree until anchor found (or null)
    let target: HTMLElement|null = eventTarget;
    while (target && !(target instanceof HTMLAnchorElement)) {
      target = target.parentElement;
    }
    if (target instanceof HTMLAnchorElement) {
      return this._locationService.handleAnchorClick(target, button, ctrlKey, metaKey);
    }
    // Allow the click to pass through
    return true;
  }
}
