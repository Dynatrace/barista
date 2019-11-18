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
  selector: 'timeline-chart-example',
  template: `
    <dt-timeline-chart value="0.37" unit="s">
      <dt-timeline-chart-timing-marker value="0.02" identifier="R">
        Request start 0.02s
        <dt-timeline-chart-overlay-title>
          Request start - 0.02s
        </dt-timeline-chart-overlay-title>
        <dt-timeline-chart-overlay-text>
          The time before the user agent starts requesting the current document
          from the server, or from relevant application caches or from local
          resources.
        </dt-timeline-chart-overlay-text>
      </dt-timeline-chart-timing-marker>
      <dt-timeline-chart-timing-marker value="0.04" identifier="S">
        Speed index 0.04s
      </dt-timeline-chart-timing-marker>
      <dt-timeline-chart-timing-marker value="0.17" identifier="I">
        DOM interactive 0.17s
      </dt-timeline-chart-timing-marker>
      <dt-timeline-chart-timing-marker value="0.37" identifier="L">
        Load event start 0.37s
      </dt-timeline-chart-timing-marker>

      <dt-timeline-chart-key-timing-marker value="0.03" identifier="V">
        Visually complete
      </dt-timeline-chart-key-timing-marker>
    </dt-timeline-chart>
  `,
})
export class TimelineChartOverlayExample {}
