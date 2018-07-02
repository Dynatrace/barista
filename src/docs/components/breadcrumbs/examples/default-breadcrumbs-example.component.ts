import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  template: `
    <dt-breadcrumbs>
      <dt-breadcrumbs-item href="first">First view</dt-breadcrumbs-item>
      <dt-breadcrumbs-item [href]="['first', 'second', {param: 123}]">Second view</dt-breadcrumbs-item>
      <dt-breadcrumbs-item [href]="['first', 'second', {param: 123}, 'third']">Third view</dt-breadcrumbs-item>
      <dt-breadcrumbs-item>Current view</dt-breadcrumbs-item>
    </dt-breadcrumbs>
  `,
})
@OriginalClassName('DefaultBreadcrumbsExampleComponent')
export class DefaultBreadcrumbsExampleComponent {
}
