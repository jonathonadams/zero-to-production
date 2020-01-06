import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveDemosRoutingModule } from './web-examples-live-demos-routing.module';
import { ExamplesDemosComponent } from './example-demos/examples-demos.component';
import { ExampleDetailComponent } from './example-demos/example-detail/example-detail.component';
import { ExampleDynamicFormComponent } from './example-demos/dynamic-form/dynamic-form.component';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import {
  DataAccessDynamicModuleLoadingModule,
  LAZY_MODULE_REGISTRY
} from '@uqt/data-access/dynamic-module-loading';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';
import { LAZY_MODULES } from './lazy-modules';

const COMPONENTS = [
  ExamplesDemosComponent,
  ExampleDetailComponent,
  ExampleDynamicFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    LiveDemosRoutingModule,
    CustomMaterialModule,
    DynamicFormModule.forChild(),
    DataAccessDynamicModuleLoadingModule
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
