import { Type } from '@angular/core';
import { FormInputComponent } from './input/input.component';
import { FormSelectComponent } from './select/select.component';
import { FormToggleComponent } from './toggle/toggle.components';
import { FormDatePickerComponent } from './date-picker/date-picker.component';
import { FormTextareaComponent } from './textarea/textarea.component';
import { FormFieldTypes } from '../dynamic-form.models';

export const COMPONENT_MAP: { [key: string]: Type<any> } = {
  [FormFieldTypes.Input]: FormInputComponent,
  [FormFieldTypes.TextArea]: FormTextareaComponent,
  [FormFieldTypes.Select]: FormSelectComponent,
  [FormFieldTypes.Toggle]: FormToggleComponent,
  [FormFieldTypes.DatePicker]: FormDatePickerComponent
};
