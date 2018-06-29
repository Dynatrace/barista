import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  // @formatter:off
  template: `
    <div class="dark" dtTheme=":dark">
      <a class="dt-link">Link on a dark background</a>
      <br />
      <a class="dt-link dt-external">External link on a dark background</a>
    </div>
  `,
  // @formatter:on
})
@OriginalClassName('LinkDarkExampleComponent')
export class LinkDarkExampleComponent {
}
