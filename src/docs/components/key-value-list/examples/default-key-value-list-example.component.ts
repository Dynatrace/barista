import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  template: `<dt-key-value-list>
   <dt-key-value-list-item *ngFor="let entry of entries" [key]="entry.key" [value]="entry.value"></dt-key-value-list-item>
</dt-key-value-list>`,
})
export class DefaultKeyValueListExampleComponent {
  entries: object[] = [
    { key : 'Temp', value : '28C' },
    { key : 'Temp1', value : '27C' },
    { key : 'Temp2', value : '24C' },
    { key : 'Temp3', value : '29C' },
    { key : 'Temp4', value : '22C' },
    { key : 'Temp5', value : '21C' },
    { key : 'Temp6', value : '25C' },
    { key : 'Temp7', value : '29C' },
  ];
}
