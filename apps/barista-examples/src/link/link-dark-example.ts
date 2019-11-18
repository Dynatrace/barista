/**
 * @license
 * Copyright 2019 Dynatrace LLC
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

import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example', // @formatter:off
  template: `
    <div class="dark" dtTheme=":dark">
      <a class="dt-link">Link on a dark background</a>
      <br />
      <a class="dt-link dt-external">External link on a dark background</a>
    </div>
  `,
  // @formatter:on
})
export class LinkDarkExample {}
