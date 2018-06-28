import { NgModule } from '@angular/core';
import { DtInputModule } from '@dynatrace/angular-components/input';
import { DtButtonModule } from '@dynatrace/angular-components/button';
import { DtIconModule } from '@dynatrace/angular-components/icon';
import { CommonModule } from '@angular/common';
import {
  DtCopyToClipboard,
} from './copy-to-clipboard';
import {
  DtCopyToClipboardLabel,
} from './copy-to-clipboard-label';

@NgModule({
  imports: [CommonModule,
            DtInputModule,
            DtButtonModule,
            DtIconModule],
  exports: [
    DtCopyToClipboard,
    DtCopyToClipboardLabel,
  ],
  declarations: [
    DtCopyToClipboard,
    DtCopyToClipboardLabel,
  ],
})
export class DtCopyToClipboardModule { }
