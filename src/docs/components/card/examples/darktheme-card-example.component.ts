import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `<div class="demo-card dark" dtTheme=":dark">
<dt-card>
  <dt-card-icon>
    <dt-icon name="application"></dt-icon>
  </dt-card-icon>
  <dt-card-title>Top 3 JavaScript errors</dt-card-title>
  <dt-card-subtitle>Some subtitle</dt-card-subtitle>
  <dt-card-actions><button dt-button variant="secondary">Some Action</button></dt-card-actions>
  The card is not an interactive element, therefore, there are no hover, active and disabled card.
</dt-card></div>`,
})
@OriginalClassName('DarkThemeCardExampleComponent')
export class DarkThemeCardExampleComponent { }
