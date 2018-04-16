import { NgModule } from '@angular/core';
import { DocsChartComponent } from './docs-chart.component';
import { UiModule } from '../../ui/ui.module';
import { DtChartModule } from '@dynatrace/angular-components/chart';
import { DtThemingModule } from '@dynatrace/angular-components/theming';
import { DEFAULT_VIEWPORT_RESIZER_PROVIDER } from '@dynatrace/angular-components/core';
import { ChartService } from './docs-chart.service';
import { VIEWPORT_RULER_PROVIDER } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    UiModule,
    DtChartModule,
    DtThemingModule,
  ],
  declarations: [
    DocsChartComponent,
  ],
  exports: [
    DocsChartComponent,
  ],
  providers: [
    ChartService,
    VIEWPORT_RULER_PROVIDER,
    DEFAULT_VIEWPORT_RESIZER_PROVIDER,
  ],
})
export class DocsChartModule {
}
