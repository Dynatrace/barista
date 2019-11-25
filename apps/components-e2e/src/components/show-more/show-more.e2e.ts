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
import { Selector } from 'testcafe';

const label = Selector('.dt-show-more-label');
const showMore = Selector('#show-more-1');

fixture('Show more').page('http://localhost:4200/show-more');

test('should change text after click', async (testController: TestController) => {
  await testController.expect(await label.textContent).contains('Show more');
  await testController.click(showMore);
  await testController.expect(await label.textContent).contains('Show less');
});

test('should have less style', async (testController: TestController) => {
  await testController
    .expect(await showMore.getAttribute('class'))
    .notContains('dt-show-more-show-less');
  await testController.click(showMore);
  await testController
    .expect(await showMore.getAttribute('class'))
    .contains('dt-show-more-show-less');
});

test('should change on key events', async (testController: TestController) => {
  await testController.expect(await label.textContent).notContains('Show less');
  await testController.pressKey('tab').pressKey('enter');
  await testController.expect(await label.textContent).contains('Show less');
  // wait for the animation to be done
  await testController.wait(500);
  await testController.pressKey('enter');
  await testController.expect(await label.textContent).notContains('Show less');
});
