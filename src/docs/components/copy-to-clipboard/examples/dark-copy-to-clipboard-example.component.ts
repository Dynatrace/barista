import {Component} from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  template: `
    <section class="dark" dtTheme=":dark">
      <dt-copy-to-clipboard>
        <textarea dtInput>https://dark.dynatrace.com/</textarea>
        <dt-copy-to-clipboard-label>Copy</dt-copy-to-clipboard-label>
      </dt-copy-to-clipboard>
    </section>`,
})
@OriginalClassName('DarkCopyToClipboardExampleComponent')
export class DarkCopyToClipboardExampleComponent {}
