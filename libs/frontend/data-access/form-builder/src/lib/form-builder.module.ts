import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessDynamicFormModule } from '@ngw/frontend/data-access/dynamic-form';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { CustomMaterialModule } from '@ngw/common/ui/custom-material';

const COMPONENTS = [FormBuilderComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, DataAccessDynamicFormModule, CustomMaterialModule],
  exports: [FormBuilderComponent]
})
export class DataAccessFormBuilderModule {}
