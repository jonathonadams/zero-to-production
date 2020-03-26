import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CommonDynamicFormModule } from '@uqt/common/dynamic-form';
import { ExampleDynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExamplesUtilsModule } from '@uqt/examples/utils';

@NgModule({
  imports: [
    CommonModule,
    CommonDynamicFormModule.forChild(),
    CustomMaterialModule,
    ExamplesUtilsModule,
  ],
  declarations: [ExampleDynamicFormComponent],
  exports: [ExampleDynamicFormComponent],
})
export class ExamplesDynamicFormModule {}
