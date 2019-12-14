import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormInputComponent } from './fields/input/input.component';
import { FormSelectComponent } from './fields/select/select.component';
import { FormToggleComponent } from './fields/toggle/toggle.components';
import { FormDatePickerComponent } from './fields/date-picker/date-picker.component';
import { FormTextAreaComponent } from './fields/textarea/textarea.component';

const COMPONENTS = [
  FormInputComponent,
  FormSelectComponent,
  FormToggleComponent,
  FormDatePickerComponent,
  FormTextAreaComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    TextFieldModule
  ],
  exports: COMPONENTS
})
export class DynamicFormMaterialComponentsModule {}
