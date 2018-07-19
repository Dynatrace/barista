import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
  <dt-tab-group>
    <dt-tab>
      <ng-template dtTabLabel>Physical <em>CPU</em></ng-template>
      <ng-template dtTabContent>
        <h1>Physical CPUs content</h1>
      </ng-template>
    </dt-tab>
    <dt-tab>
      <ng-template dtTabLabel>CPU ready time</ng-template>
      <ng-template dtTabContent>
        <h1>cpu-ready-time content</h1>
      </ng-template>
    </dt-tab>
    <dt-tab *ngIf="hasProblems" color="error">
      <ng-template dtTabLabel>11 problems</ng-template>
      <ng-template dtTabContent>
        <h1>Housten we have 11 problems!</h1>
      </ng-template>
    </dt-tab>
  </dt-tab-group>
  <button dt-button (click)="hasProblems=!hasProblems">Toggle problems</button>
  `,
})
@OriginalClassName('DynamicTabsExampleComponent')
export class DynamicTabsExampleComponent {
  hasProblems = false;
}
