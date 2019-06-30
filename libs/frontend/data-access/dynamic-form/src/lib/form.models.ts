import { ValidatorFn, ValidationErrors } from '@angular/forms';

export type Field = InputField | SelectField;

export interface BaseField {
  name: string;
  label: string;
  initialValue?: any;
  validators: ValidatorFn[];
  autocomplete: string;
  appearance?: FormFieldAppearance;
  color?: string;
  attrs?: any;
}

export interface InputField extends BaseField {
  component: 'INPUT';
  type: InputType;
}

export interface SelectField extends BaseField {
  component: 'SELECT';
  selectOptions: SelectOption[];
}

export interface SelectOption {
  value: any;
}

export type InputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type FormFieldAppearance = 'standard' | 'fill' | 'outline';

export interface FormErrors {
  [key: string]: ValidationErrors;
}
