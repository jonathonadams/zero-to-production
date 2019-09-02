import { Type } from '@angular/core';
import { FormFieldTypes } from '../form.models';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { ToggleComponent } from './toggle/toggle.components';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TextareaComponent } from './textarea/textarea.component';

export const componentMap: { [key: string]: Type<any> } = {
  [FormFieldTypes.Input]: InputComponent,
  [FormFieldTypes.TextArea]: TextareaComponent,
  [FormFieldTypes.Select]: SelectComponent,
  [FormFieldTypes.Toggle]: ToggleComponent,
  [FormFieldTypes.DatePicker]: DatePickerComponent
};
