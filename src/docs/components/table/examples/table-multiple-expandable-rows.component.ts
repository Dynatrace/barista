import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';
import {DtExpandableRow} from '@dynatrace/angular-components';

@Component({
  moduleId: module.id,
  // tslint:disable
  template: `<dt-table [dataSource]="dataSource1">
  <ng-container dtColumnDef="host" dtColumnAlign="text">
    <dt-header-cell *dtHeaderCellDef>Host</dt-header-cell>
    <dt-cell *dtCellDef="let row">{{row.host}}</dt-cell>
  </ng-container>

  <ng-container dtColumnDef="cpu" dtColumnAlign="text">
    <dt-header-cell *dtHeaderCellDef>CPU</dt-header-cell>
    <dt-cell *dtCellDef="let row">{{row.cpu}}</dt-cell>
  </ng-container>

  <ng-container dtColumnDef="memory" dtColumnAlign="number">
    <dt-header-cell *dtHeaderCellDef>Memory</dt-header-cell>
    <dt-cell *dtCellDef="let row">{{row.memory}}</dt-cell>
  </ng-container>

  <ng-container dtColumnDef="traffic" dtColumnAlign="control">
    <dt-header-cell *dtHeaderCellDef>Network traffic</dt-header-cell>
    <dt-cell *dtCellDef="let row">{{row.traffic}}</dt-cell>
  </ng-container>

  <dt-header-row *dtHeaderRowDef="['host', 'cpu', 'memory', 'traffic']"></dt-header-row>
  <dt-expandable-row *dtRowDef="let row; columns: ['host', 'cpu', 'memory', 'traffic']" dtExpandMultiple>
    Expandable section for {{row.name}}
  </dt-expandable-row>
</dt-table>`,
  // tslint:enable
})
@OriginalClassName('TableMultipleExpandableRowsComponent')
export class TableMultipleExpandableRowsComponent implements OnInit {
  @ViewChildren(DtExpandableRow) private dtExpandableRows: QueryList<DtExpandableRow>;
  dataSource1: object[] = [
    { host: 'et-demo-2-win4', cpu: '30 %', memory: '38 % of 5.83 GB', traffic: '98.7 Mbit/s' },
    { host: 'et-demo-2-win3', cpu: '26 %', memory: '46 % of 6 GB', traffic: '625 Mbit/s' },
    { host: 'docker-host2', cpu: '25.4 %', memory: '38 % of 5.83 GB', traffic: '419 Mbit/s' },
    { host: 'et-demo-2-win1', cpu: '23 %', memory: '7.86 % of 5.83 GB', traffic: '98.7 Mbit/s' },
  ];

  ngOnInit(): void {
    // this hack is just needed for the docs component in order to initially display the table correctly
    // in a real application this is NOT needed
    this.dtExpandableRows.forEach((expandableRow) => expandableRow.expanded = false);
  }
}
