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
  selector: 'component-barista-example',
  template: `
    <dt-drawer-container class="drawer">
      <dt-drawer #drawer opened>Drawer Content</dt-drawer>
      Main content
    </dt-drawer-container>

    <button dt-button (click)="drawer.toggle()">toggle drawer</button>
  `,
  styles: [
    `
      .drawer {
        height: 300px;
        border: 1px solid #cccccc;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class DrawerDefaultExample {}
