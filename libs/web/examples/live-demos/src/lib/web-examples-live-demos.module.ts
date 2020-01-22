import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveDemosRoutingModule } from './web-examples-live-demos-routing.module';
import { ExamplesDemosComponent } from './example-demos/examples-demos.component';
import { ExampleDetailComponent } from './example-demos/example-detail/example-detail.component';
import {
  DataAccessDynamicModuleLoadingModule,
  LAZY_MODULE_REGISTRY
} from '@uqt/data-access/dynamic-module-loading';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';
import { LAZY_MODULES } from './lazy-modules';
import { WebExamplesDynamicFormModule } from '@uqt/web/examples/dynamic-form';

const COMPONENTS = [ExamplesDemosComponent, ExampleDetailComponent];

@NgModule({
  imports: [
    CommonModule,
    LiveDemosRoutingModule,
    DataAccessDynamicModuleLoadingModule,
    WebExamplesDynamicFormModule
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
export class WebExamplesLiveDemosModule {}
