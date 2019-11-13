import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamplesDynamicFormRouterModule } from './web-examples-dynamic-form-router.module';
import { ExampleDynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExampleUiDynamicFormComponent } from './ui-dynamic-form/ui-dynamic-form.component';
import { DataAccessDynamicFormModule } from '@ngw/data-access/dynamic-form';

const COMPONENTS = [ExampleDynamicFormComponent, ExampleUiDynamicFormComponent];

@NgModule({
  imports: [
    CommonModule,
    ExamplesDynamicFormRouterModule,
    DataAccessDynamicFormModule
  ],
  declarations: COMPONENTS
})
export class WebExamplesDynamicFormModule {}
