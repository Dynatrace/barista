/**
 * @license
 * Copyright 2021 Dynatrace LLC
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
  selector: 'default-dev-app-demo',
  templateUrl: 'empty-state-demo.html',
})
export class EmptyStateDemo {
  multiple = true;
  dataSource: object[] = [];
  emptyState = {
    title: 'No data that matches your query',
    message: `Amend the timefrime you're querying within or
    review your query to make your statement less restrictive.`,
  };
}
