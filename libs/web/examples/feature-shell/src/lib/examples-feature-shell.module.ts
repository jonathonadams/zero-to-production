import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesFeatureShellRoutingModule } from './examples-feature-shell-routing.module';
import { ExamplesFeatureShellComponent } from './examples-feature-shell.component';
import { CommonUiToolbarModule } from '@uqt/common/ui/toolbar';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { ExamplesComponent } from './examples/examples.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { ExamplesDataAccessModule } from '@uqt/examples/data-access';
import { CommonUiLayoutsModule } from '@uqt/common/ui/layouts';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import {
  DataAccessDynamicModuleLoadingModule,
  LAZY_MODULE_REGISTRY
} from '@uqt/data-access/dynamic-module-loading';
import { ExamplesScrollComponent } from './example-scroll/examples-scroll.component';
import { LAZY_MODULES } from './lazy-modules';
import { AboutComponent } from './about/about.component';
import { WebCommonUiAuthModule } from '@uqt/web/common/ui/auth';
import { ExampleDetailComponent } from './example-detail/example-detail.component';

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  ExamplesScrollComponent,
  ExamplesComponent,
  ExampleDetailComponent,
  AboutComponent
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
    DataAccessDynamicModuleLoadingModule,
    WebCommonUiAuthModule
  ],
  declarations: COMPONENTS,
  providers: [
    {
      provide: LAZY_MODULE_REGISTRY,
      useValue: LAZY_MODULES
    }
  ]
})
export class ExamplesFeatureShellModule {}
