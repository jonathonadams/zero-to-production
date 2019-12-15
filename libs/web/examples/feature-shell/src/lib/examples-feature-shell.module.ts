import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { ExamplesComponent } from './examples/examples.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@uqt/examples/data-access';
import { ExampleDetailComponent } from './example-detail/example-detail.component';
import { CommonUiLayoutsModule } from '@uqt/common/ui/layouts';
import { ExamplesAboutComponent } from './about/examples-about.component';
import { FactoryRenderedDirective } from './about/factory-renderer.directive';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import { DataAccessDynamicModuleLoadingModule } from '@uqt/data-access/dynamic-module-loading';

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  ExamplesAboutComponent,
  ExamplesComponent,
  ExampleDetailComponent,
  FactoryRenderedDirective
];

@NgModule({
  imports: [
    CommonModule,
    CommonUiLayoutsModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule,
    DynamicFormModule.forChild(),
    DataAccessDynamicModuleLoadingModule
  ],
  declarations: COMPONENTS
})
export class ExamplesFeatureShellModule {}
