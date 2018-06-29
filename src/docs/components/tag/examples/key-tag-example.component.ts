import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: '<dt-tag><dt-tag-key>[My key]:</dt-tag-key>My value</dt-tag>',
})
@OriginalClassName('KeyTagExampleComponent')
export class KeyTagExampleComponent { }
