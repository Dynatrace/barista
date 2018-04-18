import {Component} from '@angular/core';
import {DefaultExpandableSectionExampleComponent} from './examples/expandable-section-default-example.component';
import {InteractiveExpandableSectionExampleComponent} from './examples/expandable-section-interactive-example.component';
import {OpenExpandableSectionExampleComponent} from './examples/expandable-section-open-example.component';
import {CustomStylingExpandableSectionExampleComponent} from './examples/expandable-section-custom-styling-example.component';

@Component({
  moduleId: module.id,
  selector: 'docs-expandable-section',
  styleUrls: ['./docs-expandable-section.component.scss'],
  templateUrl: './docs-expandable-section.component.html',
})
export class DocsExpandableSectionComponent {

  examples = {
    default: DefaultExpandableSectionExampleComponent,
    interactive: InteractiveExpandableSectionExampleComponent,
    open: OpenExpandableSectionExampleComponent,
    customStyling: CustomStylingExpandableSectionExampleComponent
  };
}
