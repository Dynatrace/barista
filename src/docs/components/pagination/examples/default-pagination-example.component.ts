import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: '<dt-pagination [maxPages]="4" [currentPage]="2"></dt-pagination>',
})
@OriginalClassName('DefaultPaginationExampleComponent')
export class DefaultPaginationExampleComponent { }
