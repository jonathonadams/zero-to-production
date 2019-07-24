import { ValidatorFn, ValidationErrors } from '@angular/forms';

export type Field = InputField | SelectField;

export interface BaseField {
  name: string;
  label: string;
  initialValue?: any;
  validators?: ValidatorFn[];
  asyncValidators?: any[];
  autocomplete: AutoComplete;
  appearance?: FormFieldAppearance;
  color?: string;
  attrs?: any;
}

export interface InputField extends BaseField {
  component: FormFieldTypes.Input;
  type: InputType;
}

export interface SelectField extends BaseField {
  component: FormFieldTypes.Select;
  selectOptions: SelectOption[];
}

export interface SelectOption {
  value: any;
}

// There are more to complete here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
export type AutoComplete =
  | 'off'
  | 'on'
  | 'name'
  | 'email'
  | 'username'
  | 'bday'
  | 'tel'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address';

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

export enum FormFieldTypes {
  Input = 'INPUT',
  Select = 'SELECT'
}
