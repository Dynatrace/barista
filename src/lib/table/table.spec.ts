import { CommonModule } from '@angular/common';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DtCell,
  DtHeaderCell,
  DtRow,
  DtTable,
  DtTableEmptyStateDirective,
  DtTableEmptyStateMessage,
  DtTableEmptyStateTitle,
  DtTableLoadingState,
  DtTableModule,
} from './index';
import { DtLoadingDistractor, DtLoadingDistractorModule } from '../loading-distractor/index';

describe('DtTable', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DtTableModule, DtLoadingDistractorModule],
      declarations: [TestApp, TestDynamicApp],
    });

    TestBed.compileComponents();
  }));

  // Regular button tests
  describe('Table Rendering', () => {
    it('Should render the TestComponent', () => {
      const fixture = TestBed.createComponent(TestApp);
      expect(fixture.componentInstance.tableComponent.dataSource).toBeFalsy('Expected component dataSource empty');

      fixture.detectChanges();

      expect(fixture.componentInstance).toBeTruthy('Expected test component defined');
      expect(fixture.componentInstance.tableComponent).toBeTruthy('Expected component defined');
      expect(fixture.componentInstance.tableComponent.dataSource).toBeTruthy('Expected component received dataSource');
    });

    it('Should render a TableComponent', () => {
      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const dataSourceRows = (fixture.componentInstance.dataSource as object[]).length;
      const tableRows = fixture.debugElement.queryAll(By.directive(DtRow));
      const dataSourceCells = (fixture.componentInstance.dataSource as object[])
        .reduce((prev, cur) => Object.keys(cur).length + prev, 0);
      const tableCells = fixture.debugElement.queryAll(By.directive(DtCell));

      expect(tableRows.length).toBe(dataSourceRows, 'Expected the same amount of rows that the dataSource');
      expect(tableCells.length).toBe(dataSourceCells, 'Expected the same amount of cells that the dataSource');
    });

    it('Should have corresponding classes', () => {
      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const tableComponent = fixture.debugElement.queryAll(By.css('dt-table'));
      const tableRows = fixture.debugElement.queryAll(By.css('dt-row'));
      const tableCells = fixture.debugElement.queryAll(By.css('dt-cell'));
      const tableHeaderRows = fixture.debugElement.queryAll(By.css('dt-header-row'));
      const tableHeaderCells = fixture.debugElement.queryAll(By.css('dt-header-cell'));
      const tableColumnProportionCells = fixture.debugElement.queryAll(By.css('.dt-table-column-col1'));
      const tableColumnMinWidthCells = fixture.debugElement.queryAll(By.css('.dt-table-column-col2'));
      const tableColumnMinWidthAndPropCells = fixture.debugElement.queryAll(By.css('.dt-table-column-col3'));
      const tableHeaderCellsAlignCenter = fixture.debugElement.queryAll(By.css('.dt-header-cell.dt-table-column-align-center'));
      const tableCellsAlignCenter = fixture.debugElement.queryAll(By.css('.dt-cell.dt-table-column-align-center'));

      // tslint:disable:no-magic-numbers
      expect(tableComponent.length)
        .toBe(1, 'Expected 1 component with directive <dt-table>');
      expect(tableRows.length)
        .toBe(4, 'Expected 4 components with directive <dt-row>');
      expect(tableCells.length)
        .toBe(12, 'Expected 12 components with directive <dt-cell>');
      expect(tableHeaderRows.length)
        .toBe(1, 'Expected 1 component with directive <dt-header-row>');
      expect(tableHeaderCells.length)
        .toBe(3, 'Expected 3 components with directive <dt-header-cell>');
      expect(tableColumnProportionCells.length)
        .toBe(5, 'Expected 5 components with the CSS .dt-table-column-col1 class applied');
      expect(tableColumnMinWidthCells.length)
        .toBe(5, 'Expected 5 components with the CSS .dt-table-column-col2 class applied');
      expect(tableColumnMinWidthAndPropCells.length)
        .toBe(5, 'Expected 5 components with the CSS .dt-table-column-col3 class applied');
      expect(tableHeaderCellsAlignCenter.length)
        .toBe(1, 'Expected 1 header cells with the CSS .dt-table-column-align-center class applied');
      expect(tableCellsAlignCenter.length)
        .toBe(4, 'Expected 4 header cells with the CSS .dt-table-column-align-center class applied');

      tableColumnMinWidthCells.forEach((cell, index) => {
        expect(cell.nativeElement.style.minWidth)
          .toBe('50px', `Expected cell ${index} min width prop set`);
        expect(cell.nativeElement.style.flexGrow)
          .toBeFalsy(`Expected cell ${index} flexGrow prop to be empty`);
        expect(cell.nativeElement.style.flexShrink)
          .toBeFalsy(`Expected cell ${index} flexShrink prop to be empty`);
      });

      tableColumnProportionCells.forEach((cell, index) => {
        expect(cell.nativeElement.style.minWidth)
          .toBeFalsy(`Expected cell ${index} minWidth prop to be empty`);
        expect(cell.nativeElement.style.flexGrow)
          .toBe('2', `Expected cell ${index} with just DtColumnProportion input set, have flexGrow prop set to 2`);
        expect(cell.nativeElement.style.flexShrink)
          .toBe('2', `Expected cell ${index} with just DtColumnProportion prop set, have flexShrink prop set to 2`);
      });

      tableColumnMinWidthAndPropCells.forEach((cell, index) => {
        expect(cell.nativeElement.style.minWidth)
          .toBe('50px', `Expected cell ${index} Expected min width prop set`);
        expect(cell.nativeElement.style.flexGrow)
          .toBe('2', `Expected cell ${index} with DtColumnProportion input set, have flexGrow prop set to 2`);
        expect(cell.nativeElement.style.flexShrink)
          .toBe('2', `Expected cell ${index} with DtColumnProportion input set, have flexShrink prop set to 2`);
      });
      // tslint:enable:no-magic-numbers
    });

    it('Should render a EmptyState content', () => {
      const fixture = TestBed.createComponent(TestApp);
      fixture.detectChanges();

      const noEmptyComponent = fixture.debugElement.query(By.directive(DtTableEmptyStateDirective));
      expect(noEmptyComponent).toBeFalsy('Expected the DtTableEmptyState not beign rendered for not empty tables');

      const emptyDataSources = [[], null, undefined];

      emptyDataSources.forEach((ds) => {
        fixture.componentInstance.dataSource = ds;
        fixture.detectChanges();

        const emptyComponent = fixture.debugElement.query(By.directive(DtTableEmptyStateDirective));
        expect(emptyComponent).toBeTruthy('Expected the DtTableEmptyState rendered for empty tables');

        const emptyTitleComponent = fixture.debugElement.query(By.directive(DtTableEmptyStateTitle));
        expect(emptyTitleComponent).toBeTruthy('Expected the DtTableEmptyStateTitle rendered for empty tables');

        const emptyMessageComponent = fixture.debugElement.query(By.directive(DtTableEmptyStateMessage));
        expect(emptyMessageComponent).toBeTruthy('Expected the DtTableEmptyStateMessage rendered for empty tables');
      });

    });

    it('Should render a LoadingComponent', () => {
      const fixture = TestBed.createComponent(TestApp);
      fixture.componentInstance.loading = true;
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(DtLoadingDistractor));
      expect(loadingComponent).toBeTruthy('Expected the DtLoadingSpinner beign rendered for loading tables');

      const loadingPlaceholder = fixture.debugElement.query(By.directive(DtTableLoadingState));
      expect(loadingPlaceholder).toBeTruthy('Expected the DtTableLoadingState placeholder beign rendered for loading tables');

      fixture.componentInstance.loading = false;
      fixture.detectChanges();

      const noLoadingComponent = fixture.debugElement.query(By.directive(DtLoadingDistractor));
      expect(noLoadingComponent).toBeFalsy('Expected the DtLoadingSpinner not beign rendered for not loading tables');
    });

    it('Should render dynamic columns', () => {
      const fixture = TestBed.createComponent(TestDynamicApp);
      fixture.detectChanges();

      const {dataSource, columns} = fixture.componentInstance;

      const testColumns = fixture.debugElement.queryAll(By.directive(DtHeaderCell));
      expect(testColumns.length).toBe(columns.length, 'Expected the DtLoadingSpinner being rendered for loading tables');

      const MAX_ITER = 10;
      for (let i = 0; i < MAX_ITER; i++) {
        const newRow = {};

        columns.forEach((elem) => {
          newRow[elem] = {[`${elem}`]: elem};
        });

        fixture.componentInstance.dataSource.push(newRow);
      }

      fixture.componentInstance.tableComponent.renderRows();
      fixture.detectChanges();

      const cells = fixture.debugElement.queryAll(By.directive(DtCell));
      const testCells = dataSource.reduce((prev, cur) => Object.keys(cur).length + prev, 0);
      const testRows = fixture.debugElement.queryAll(By.directive(DtRow));

      expect(cells.length).toBe(testCells, 'Expected the same number of DtCells as DataSource cells');
      expect(dataSource.length).toBe(testRows.length, 'Expected the same number of DtRows as DataSource rows');
    });

  });
});

/** Test component that contains a DtTable. */
@Component({
  selector: 'dt-test-app',
  template: `
  <dt-table [dataSource]="dataSource" [isLoading]="loading">
    <ng-container dtColumnDef="col1" [dtColumnProportion]="2" dtColumnAlign="center">
      <dt-header-cell *dtHeaderCellDef>column 1</dt-header-cell>
      <dt-cell *dtCellDef="let row">{{row.col1}}</dt-cell>
    </ng-container>

    <ng-container dtColumnDef="col2" dtColumnMinWidth="50" dtColumnAlign="no-align-type">
      <dt-header-cell *dtHeaderCellDef>column 2</dt-header-cell>
      <dt-cell *dtCellDef="let row">{{row.col2}}</dt-cell>
    </ng-container>

    <ng-container dtColumnDef="col3" dtColumnMinWidth="50" dtColumnProportion="2">
      <dt-header-cell *dtHeaderCellDef>column 3</dt-header-cell>
      <dt-cell *dtCellDef="let row">{{row.col3}}</dt-cell>
    </ng-container>

    <dt-table-empty-state dtTableEmptyState>
      <dt-table-empty-state-title>No host</dt-table-empty-state-title>
      <dt-table-empty-state-message>Test message</dt-table-empty-state-message>
    </dt-table-empty-state>

    <dt-loading-distractor dtTableLoadingState>Loading...</dt-loading-distractor>

    <dt-header-row *dtHeaderRowDef="['col1', 'col2', 'col3']"></dt-header-row>
    <dt-row *dtRowDef="let row; columns: ['col1', 'col2', 'col3']"></dt-row>
  </dt-table>
  `,
})
class TestApp {
  @ViewChild(DtTable) tableComponent: DtTable<object[]>;
  loading = false;
  dataSource: object[] | null | undefined = [
    {col1: 'test 1', col2: 'test 2', col3: 'test 3'},
    {col1: 'test 1', col2: 'test 2', col3: 'test 3'},
    {col1: 'test 1', col2: 'test 2', col3: 'test 3'},
    {col1: 'test 1', col2: 'test 2', col3: 'test 3'},
  ];

  constructor(public _renderer: Renderer2) {

  }
}

/** Test component that contains a Dynamic DtTable. */
@Component({
  selector: 'dt-test-app',
  template: `
  <dt-table [dataSource]="dataSource">
    <ng-container *ngFor="let column of columns;" [dtColumnDef]="column">
      <dt-header-cell *dtHeaderCellDef>{{ column }}</dt-header-cell>
      <dt-cell *dtCellDef="let row">{{ row[column] }}</dt-cell>
    </ng-container>

    <dt-header-row *dtHeaderRowDef="columns"></dt-header-row>
    <dt-row *dtRowDef="let row; columns: columns"></dt-row>
    </dt-table>
  `,
})
class TestDynamicApp {
  @ViewChild(DtTable) tableComponent: DtTable<object[]>;
  columns = ['col1', 'col2', 'col3'];
  dataSource: object[] = [];
}
