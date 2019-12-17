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
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import {
  DataAccessDynamicModuleLoadingModule,
  LAZY_MODULE_REGISTRY,
  ILazyModuleRegistry
} from '@uqt/data-access/dynamic-module-loading';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as AutoScrollingModule } from '@angular/cdk-experimental/scrolling';

const LAZY_MODULES: ILazyModuleRegistry = {
  'dynamic-form': () =>
    import('@uqt/examples/dynamic-form').then(
      m => m.WebExamplesDynamicFormModule
    ),
  'form-builder': () =>
    import('@uqt/examples/form-builder').then(
      m => m.WebExamplesFormBuilderModule
    ),
  theming: () =>
    import('@uqt/examples/theming').then(m => m.WebExamplesThemingModule),
  secure: () =>
    import('@uqt/todos/feature-shell').then(m => m.TodosFeatureShellModule)
};

const COMPONENTS = [
  ExamplesFeatureShellComponent,
  ExamplesAboutComponent,
  ExamplesComponent,
  ExampleDetailComponent
];

@NgModule({
  imports: [
    CommonModule,
    CommonUiLayoutsModule,
    ScrollingModule,
    AutoScrollingModule,
    CustomMaterialModule,
    CommonUiToolbarModule,
    CommonUiCardModule,
    ExamplesDataAccessModule,
    ExamplesFeatureShellRoutingModule,
    DynamicFormModule.forChild(),
    DataAccessDynamicModuleLoadingModule
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
