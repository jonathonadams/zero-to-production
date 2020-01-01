import { ValidatorFn, AsyncValidator } from '@angular/forms';
import { Type } from '@angular/core';
import { DynamicFormErrorsMap } from './form-errors.interface';

export interface DynamicFormState {
  config: IDynamicFormConfig;
  index: number;
  data: any;
  errors: string[];
}

/**
 * The bare interface to create a new form:
 */
export interface IDynamicFormConfig {
  formName: string;
  animations: boolean;
  paginateSections: boolean;
  structure: TFormGroups;
  formValidators: ValidatorFn[];
}

export type TField =
  | IInputField
  | ISelectField
  | IToggleField
  | IDatePickerField
  | ITextArea
  | ICustomInput;

export type TFormGroups = TFormGroup[];
export type TFormGroup = IFormGroup | TFormArray;

export interface IFormGroup {
  groupName: string;
  groupType: FormGroupTypes.Group;
  fields: TField[];
  cssClasses?: string[];
}

export type TFormArray = IFormGroupArray;
// export type TFormArray = IFormGroupArray | IFormFieldArray;

export interface IBaseFormArray {
  groupName: string;
  groupType: FormGroupTypes.Array;
  initialNumber?: number;
}

export interface IFormGroupArray extends IBaseFormArray {
  arrayType: FormArrayTypes.Group;
  fields: TField[];
}

// export interface IFormFieldArray extends IBaseFormArray {
//   arrayType: FormArrayTypes.Field;
//   field: TField;
// }

export interface IBaseField {
  name: string;
  label: string;
  validators?: ValidatorFn[];
  asyncValidators?: Type<AsyncValidator>[];
  autocomplete?: TAutoComplete;
  attrs?: any;
}

export interface IInputField extends IBaseField {
  type: FormFieldTypes.Input;
  inputType?: InputFieldTypes;
}

export interface ITextArea extends IBaseField {
  type: FormFieldTypes.TextArea;
}

export interface ISelectField extends IBaseField {
  type: FormFieldTypes.Select;
  selectOptions: ISelectOption[];
}

export interface IToggleField extends IBaseField {
  type: FormFieldTypes.Toggle;
}

export interface IDatePickerField extends IBaseField {
  type: FormFieldTypes.DatePicker;
}

export interface ISelectOption {
  display: string;
  value: any;
}

export interface ICustomInput extends IBaseField {
  type: string;
}

// There are more to complete here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
export type TAutoComplete =
  | 'off'
  | 'on'
  | 'name'
  | 'given-name'
  | 'family-name'
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

export enum InputFieldTypes {
  Color = 'color',
  Date = 'date',
  DateTimeLocal = 'datetime-local',
  Email = 'email',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Search = 'search',
  Tel = 'tel',
  Text = 'text',
  Time = 'time',
  Url = 'url',
  Week = 'week'
}

// Muse be strings
export enum FormGroupTypes {
  Group = 'GROUP',
  Array = 'ARRAY'
}

export enum FormArrayTypes {
  Group = 'GROUP',
  Field = 'FIELD'
}

export enum FormFieldTypes {
  Input = 'INPUT',
  TextArea = 'TEXT_AREA',
  Select = 'SELECT',
  Toggle = 'TOGGLE',
  DatePicker = 'DATE_PICKER',
  CheckBox = 'CHECK_BOX'
}

export interface DynamicFormConfig {
  components: BaseComponentMap;
  errors?: DynamicFormErrorsMap;
}

export type BaseComponentMap = {
  [key in FormFieldTypes]: Type<any>;
};

export type CustomComponentMap = {
  [key: string]: Type<any>;
};

export interface DynamicFormComponentMap
  extends BaseComponentMap,
    CustomComponentMap {}
