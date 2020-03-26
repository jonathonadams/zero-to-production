import {
  FormFieldTypes,
  DynamicFormComponentMap,
} from '@uqt/common/dynamic-form';
import { FormInputComponent } from './fields/input/input.component';
import { FormSelectComponent } from './fields/select/select.component';
import { FormToggleComponent } from './fields/toggle/toggle.components';
import { FormDatePickerComponent } from './fields/date-picker/date-picker.component';
import { FormTextAreaComponent } from './fields/textarea/textarea.component';
import { FormCheckBoxComponent } from './fields/checkbox/checkbox.components';

export const MATERIAL_COMPONENT_MAP: DynamicFormComponentMap = {
  [FormFieldTypes.Input]: FormInputComponent,
  [FormFieldTypes.TextArea]: FormTextAreaComponent,
  [FormFieldTypes.Select]: FormSelectComponent,
  [FormFieldTypes.Toggle]: FormToggleComponent,
  [FormFieldTypes.DatePicker]: FormDatePickerComponent,
  [FormFieldTypes.CheckBox]: FormCheckBoxComponent,
};
