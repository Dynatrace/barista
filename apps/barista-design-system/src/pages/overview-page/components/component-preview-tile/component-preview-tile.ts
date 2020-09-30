/**
 * @license
 * Copyright 2020 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, ElementRef, Input } from '@angular/core';
import { BaCategoryNavigationSectionItem } from '@dynatrace/shared/design-system/interfaces';
import { BaOverviewTile } from '../../shared';

@Component({
  selector: 'a[ba-component-preview-tile]',
  templateUrl: 'component-preview-tile.html',
  styleUrls: ['component-preview-tile.scss'],
  host: {
    class: 'ba-component-preview-tile',
  },
})
export class BaComponentPreviewTile extends BaOverviewTile {
  @Input() set inputData(inputData: BaCategoryNavigationSectionItem) {
    this.data = inputData;
  }

  /** Whether to display the description or not */
  @Input() listView = true;

  constructor(private _elementReference: ElementRef) {
    super(_elementReference);
  }
}
