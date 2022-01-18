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

export interface EventChartDemoEvent {
  lane: string;
  value: number;
  duration: number;
  color?: 'default' | 'error' | 'filtered';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface EventChartDemoHeatfield {
  start?: number;
  end?: number;
  color?: 'default' | 'error' | 'filtered';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export interface EventChartDemoLane {
  name: string;
  label: string;
  color: 'default' | 'error' | 'conversion';
}

export interface EventChartDemoLegendItem {
  lanes: string[];
  label: string;
}

export interface EventChartDemoDataSource {
  getEvents(): EventChartDemoEvent[];
  getLanes(): EventChartDemoLane[];
  getLegendItems(): EventChartDemoLegendItem[];
  getHeatfields(): EventChartDemoHeatfield[];
}
