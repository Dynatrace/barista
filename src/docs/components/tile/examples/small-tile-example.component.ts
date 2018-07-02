import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
<dt-tile>
  <dt-tile-icon><dt-icon name="agent"></dt-icon></dt-tile-icon>
  <dt-tile-title>L-W8-64-APMDay3</dt-tile-title>
  Network traffic
</dt-tile>`,
})
@OriginalClassName('SmallTileExampleComponent')
export class SmallTileExampleComponent { }
