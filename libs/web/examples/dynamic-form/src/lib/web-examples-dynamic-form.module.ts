import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    DynamicFormModule.forChild()
  ],
  declarations: COMPONENTS
})
export class WebExamplesDynamicFormModule {
  static get lazyEntryComponent() {
    return ExampleDynamicFormComponent;
  }
}
