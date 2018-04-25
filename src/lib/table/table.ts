import {
  Component,
  AfterContentChecked,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CdkTable } from '@angular/cdk/table';

@Component({
  moduleId: module.id,
  selector: 'dt-table',
  styleUrls: ['./scss/table.scss'],
  templateUrl: './table.html',
  exportAs: 'dtTable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  host: {
    class: 'dt-table',
  },
})
export class DtTable<T> extends CdkTable<T> implements AfterContentChecked {
  @Input() isLoading: boolean;

  get isEmptyDataSource(): boolean {
    if (Array.isArray(this.dataSource) && !this.dataSource.length) {
      return true;
    }

    return !this.dataSource;
  }
}
