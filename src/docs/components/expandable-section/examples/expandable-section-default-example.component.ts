import { Component } from '@angular/core';
import { LOREM_IPSUM } from '../../../core/lorem-ipsum';

@Component({
  moduleId: module.id,
  template: `<dt-expandable-section>
    <dt-expandable-section-header>My header text</dt-expandable-section-header>
  {{ text }}
</dt-expandable-section>`,
})
export class DefaultExpandableSectionExampleComponent {
  text = LOREM_IPSUM;
}
