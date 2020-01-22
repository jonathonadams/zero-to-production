import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { DynamicFormModule } from '@uqt/data-access/dynamic-form';
import { ExampleDynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  imports: [CommonModule, DynamicFormModule.forChild(), CustomMaterialModule],
  declarations: [ExampleDynamicFormComponent],
  exports: [ExampleDynamicFormComponent]
})
export class WebExamplesDynamicFormModule {}
