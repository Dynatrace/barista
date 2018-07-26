import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
    <dt-select placeholder="Select filter type">
      <dt-option value="Application">Application</dt-option>
      <dt-option value="Bounce">Bounce</dt-option>
      <dt-optgroup label="Browsers">
        <dt-option value="Browser family">Browser family</dt-option>
        <dt-option value="Browser type">Browser type</dt-option>
        <dt-option value="Browser version">Browser version</dt-option>
      </dt-optgroup>
      <dt-optgroup label="Location">
        <dt-option value="City">City</dt-option>
        <dt-option value="Country">Country</dt-option>
        <dt-option value="Continent">Continent</dt-option>
      </dt-optgroup>
    </dt-select>
  `,
})
@OriginalClassName('GroupsSelectExampleComponent')
export class GroupsSelectExampleComponent { }
