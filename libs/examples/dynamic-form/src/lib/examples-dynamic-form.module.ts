import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonDynamicFormModule } from '@ztp/common/dynamic-form';
import { ExampleDynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ExamplesUtilsModule } from '@ztp/examples/utils';

@NgModule({
  imports: [
    CommonModule,
    CommonDynamicFormModule.forChild(),
    MatCheckboxModule,
    ExamplesUtilsModule,
  ],
  declarations: [ExampleDynamicFormComponent],
  exports: [ExampleDynamicFormComponent],
})
export class ExamplesDynamicFormModule {}
