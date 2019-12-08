import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { ExamplesDynamicFormRouterModule } from './web-examples-dynamic-form-router.module';
import { ExampleDynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CommonUiCardModule } from '@uqt/common/ui/card';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';

const COMPONENTS = [ExampleDynamicFormComponent];

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CommonUiCardModule,
    DynamicFormModule.forChild(),
    ExamplesDynamicFormRouterModule
  ],
  declarations: COMPONENTS
})
export class WebExamplesDynamicFormModule {
  constructor(injector: Injector) {
    // registering our Angular Component
    const el = createCustomElement(ExampleDynamicFormComponent, { injector });
    customElements.define('example-dynamic-form', el);
  }
}
