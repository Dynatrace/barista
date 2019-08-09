import { NgModule } from '@angular/core';
import { DtAlertModule } from '@dynatrace/angular-components/alert';
import { DtAutocompleteModule } from '@dynatrace/angular-components/autocomplete';
import { DtBarIndicatorModule } from '@dynatrace/angular-components/bar-indicator';
import { DtBreadcrumbsModule } from '@dynatrace/angular-components/breadcrumbs';
import { DtButtonGroupModule } from '@dynatrace/angular-components/button-group';
import { DtButtonModule } from '@dynatrace/angular-components/button';
import { DtCardModule } from '@dynatrace/angular-components/card';
import { DtChartModule } from '@dynatrace/angular-components/chart';
import { DtCheckboxModule } from '@dynatrace/angular-components/checkbox';
import { DtConsumptionModule } from '@dynatrace/angular-components/consumption';
import { DtContextDialogModule } from '@dynatrace/angular-components/context-dialog';
import { DtCopyToClipboardModule } from '@dynatrace/angular-components/copy-to-clipboard';
import { DtCtaCardModule } from '@dynatrace/angular-components/cta-card';
import { DtDrawerModule } from '@dynatrace/angular-components/drawer';
import { DtEmptyStateModule } from '@dynatrace/angular-components/empty-state';
import { DtExpandablePanelModule } from '@dynatrace/angular-components/expandable-panel';
import { DtExpandableSectionModule } from '@dynatrace/angular-components/expandable-section';
import { DtFilterFieldModule } from '@dynatrace/angular-components/filter-field';
import { DtFormattersModule } from '@dynatrace/angular-components/formatters';
import { DtFormFieldModule } from '@dynatrace/angular-components/form-field';
import { DtHighlightModule } from '@dynatrace/angular-components/highlight';
import { DtIconModule } from '@dynatrace/angular-components/icon';
import { DtInfoGroupModule } from '@dynatrace/angular-components/info-group';
import { DtInlineEditorModule } from '@dynatrace/angular-components/inline-editor';
import { DtInputModule } from '@dynatrace/angular-components/input';
import { DtKeyValueListModule } from '@dynatrace/angular-components/key-value-list';
import { DtLegendModule } from '@dynatrace/angular-components/legend';
import { DtLoadingDistractorModule } from '@dynatrace/angular-components/loading-distractor';
import { DtMenuModule } from '@dynatrace/angular-components/menu';
import { DtMicroChartModule } from '@dynatrace/angular-components/micro-chart';
import { DtOverlayModule } from '@dynatrace/angular-components/overlay';
import { DtPaginationModule } from '@dynatrace/angular-components/pagination';
import { DtProgressBarModule } from '@dynatrace/angular-components/progress-bar';
import { DtProgressCircleModule } from '@dynatrace/angular-components/progress-circle';
import { DtRadioModule } from '@dynatrace/angular-components/radio';
import { DtSelectionAreaModule } from '@dynatrace/angular-components/selection-area';
import { DtSelectModule } from '@dynatrace/angular-components/select';
import { DtShowMoreModule } from '@dynatrace/angular-components/show-more';
import { DtSwitchModule } from '@dynatrace/angular-components/switch';
import { DtTableModule } from '@dynatrace/angular-components/table';
import { DtTabsModule } from '@dynatrace/angular-components/tabs';
import { DtTagModule } from '@dynatrace/angular-components/tag';
import { DtThemingModule } from '@dynatrace/angular-components/theming';
import { DtTileModule } from '@dynatrace/angular-components/tile';
import { DtTimelineChartModule } from '@dynatrace/angular-components/timeline-chart';
import { DtToastModule } from '@dynatrace/angular-components/toast';
import { DtToggleButtonGroupModule } from '@dynatrace/angular-components/toggle-button-group';
import { DtTreeTableModule } from '@dynatrace/angular-components/tree-table';

/**
 * NgModule that includes all Dynatrace angular components modules that are required to serve the examples.
 */
@NgModule({
  exports: [
    DtAlertModule,
    DtAutocompleteModule,
    DtBarIndicatorModule,
    DtBreadcrumbsModule,
    DtButtonModule,
    DtButtonGroupModule,
    DtCardModule,
    DtChartModule,
    DtCheckboxModule,
    DtContextDialogModule,
    DtCopyToClipboardModule,
    DtCtaCardModule,
    DtDrawerModule,
    DtExpandablePanelModule,
    DtExpandableSectionModule,
    DtFilterFieldModule,
    DtFormFieldModule,
    DtFormattersModule,
    DtHighlightModule,
    DtIconModule,
    DtInfoGroupModule,
    DtInlineEditorModule,
    DtInputModule,
    DtKeyValueListModule,
    DtLoadingDistractorModule,
    DtMicroChartModule,
    DtOverlayModule,
    DtPaginationModule,
    DtProgressBarModule,
    DtProgressCircleModule,
    DtRadioModule,
    DtSelectModule,
    // tslint:disable-next-line: deprecation
    DtSelectionAreaModule,
    DtShowMoreModule,
    DtSwitchModule,
    DtTableModule,
    DtTabsModule,
    DtTagModule,
    DtThemingModule,
    DtTileModule,
    DtToastModule,
    DtTreeTableModule,
    DtToggleButtonGroupModule,
    DtConsumptionModule,
    DtMenuModule,
    DtTimelineChartModule,
    DtLegendModule,
    DtEmptyStateModule,
  ],
})
export class DevAppDynatraceModule {}
