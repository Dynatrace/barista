import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'dt-loading-distractor',
  exportAs: 'dtLoadingDistractor',
  templateUrl: 'loading-distractor.html',
  styleUrls: ['loading-distractor.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtLoadingDistractor {
  _labelId = `"dt-loading-distractor-label-${nextUniqueId++}`;
}
