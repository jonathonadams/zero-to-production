import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesLiveDemosRoutingModule } from './examples-live-demos-routing.module';
import { ExamplesDemosComponent } from './example-demos/examples-demos.component';
import { ExampleDetailComponent } from './example-demos/example-detail/example-detail.component';
import {
  SharedUtilsDynamicModuleLoadingModule,
  LAZY_MODULE_REGISTRY
} from '@uqt/shared/utils/dynamic-module-loading';
import { CodeHighlightService } from '@uqt/examples/utils';
import { LAZY_MODULES } from './lazy-modules';
import { ExamplesDynamicFormModule } from '@uqt/examples/dynamic-form';

const COMPONENTS = [ExamplesDemosComponent, ExampleDetailComponent];

@NgModule({
  imports: [
    CommonModule,
    ExamplesLiveDemosRoutingModule,
    SharedUtilsDynamicModuleLoadingModule,
    ExamplesDynamicFormModule
  ],
  declarations: COMPONENTS,
  providers: [
    CodeHighlightService,
    {
      provide: LAZY_MODULE_REGISTRY,
      useValue: LAZY_MODULES
    }
  ]
})
export class ExamplesLiveDemosModule {}
