import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UIApp, Home } from './ui-test-app/ui-test-app';
import { UI_TEST_APP_ROUTES } from './ui-test-app/routes';
import {
  DtButtonModule,
  DtButtonGroupModule,
  DtExpandableSectionModule,
  DtExpandablePanelModule,
  DtTileModule,
  DtContextDialogModule,
  DtKeyValueListModule,
} from '@dynatrace/angular-components';
import { ButtonUI } from './button/button-ui';
import { ButtonGroupUi } from './button-group/button-group-ui';
import { ExpandableSectionUi } from './expandable-section/expandable-section-ui';
import { ExpandablePanelUi } from './expandable-panel/expandable-panel-ui';
import { TileUI } from './tile/tile-ui';
import { ContextDialogUI } from './context-dialog/context-dialog-ui';
import { KeyValueListUI } from './key-value-list/key-value-list-ui';

/**
 * NgModule that contains all lib modules that are required to serve the ui-test-app.
 */
@NgModule({
  exports: [
    DtButtonModule,
    DtButtonGroupModule,
    DtExpandablePanelModule,
    DtExpandableSectionModule,
    DtTileModule,
    DtContextDialogModule,
    DtKeyValueListModule,
  ],
})
export class DynatraceAngularCompModule {}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(UI_TEST_APP_ROUTES),
    DynatraceAngularCompModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UIApp,
    Home,
    ButtonUI,
    ButtonGroupUi,
    ExpandablePanelUi,
    ExpandableSectionUi,
    TileUI,
    ContextDialogUI,
    KeyValueListUI,
  ],
  bootstrap: [UIApp],
})
export class UiTestAppModule { }
