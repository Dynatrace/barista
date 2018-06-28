import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `<div class="demo-card">
<dt-card>
  <dt-card-title>Top 3 JavaScript errors</dt-card-title>
  <dt-card-subtitle>Some subtitle</dt-card-subtitle>
  <dt-card-actions>
    <button dt-button variant="secondary">Add to dashboard</button>
    <button dt-button variant="secondary">Edit</button>
  </dt-card-actions>
  The card is not an interactive element, therefore, there are no hover, active and disabled card.
</dt-card></div>`,
})
@OriginalClassName('ActionButtonsCardExampleComponent')
export class ActionButtonsCardExampleComponent { }
