import { ValidatorFn, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Type } from '@angular/core';

export type TField = IInputField | ISelectField;
export type TFormGroups = IFormGroup[];

export interface IFormGroup {
  name: string;
  fields: TField[];
}

export interface IBaseField {
  name: string;
  label: string;
  initialValue?: any;
  validators?: ValidatorFn[];
  asyncValidators?: Type<AsyncValidator>[];
  autocomplete: TAutoComplete;
  appearance?: TFormFieldAppearance;
  color?: string;
  attrs?: any;
}

export interface IInputField extends IBaseField {
  component: FormFieldTypes.Input;
  type: TInputType;
}

export interface ISelectField extends IBaseField {
  component: FormFieldTypes.Select;
  selectOptions: ISelectOption[];
}

export interface ISelectOption {
  value: any;
}

// There are more to complete here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
export type TAutoComplete =
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

export type TInputType =
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

export type TFormFieldAppearance = 'standard' | 'fill' | 'outline';

export interface IFormErrors {
  [key: string]: ValidationErrors;
}

export enum FormFieldTypes {
  Input = 'INPUT',
  Select = 'SELECT'
}
