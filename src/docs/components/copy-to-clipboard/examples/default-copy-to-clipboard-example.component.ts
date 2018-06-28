import {Component} from '@angular/core';

@Component({
  template: `
    <dt-copy-to-clipboard>
      <textarea dtInput>https://defaultcopy.dynatrace.com/</textarea>
      <dt-copy-to-clipboard-label>Copy</dt-copy-to-clipboard-label>
    </dt-copy-to-clipboard>`,
})
export class DefaultCopyToClipboardExampleComponent {
}
