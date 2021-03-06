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
  enabled: boolean;
  animations: boolean;
  paginateSections: boolean;
  classes?: string[];
  structure: TFormStructure;
  formValidators: ValidatorFn[];
}

// structure is either an array of form groups for form array
export type TFormStructure = TFormGroup[];
export type TFormGroup = IFormGroup | TFormArray;

export interface IBaseFormGroupAndArray {
  groupName: string;
  displayName?: string;
  classes?: string[];
}

export interface IFormGroup extends IBaseFormGroupAndArray {
  groupType: FormGroupTypes.Group;
  fields: TField[];
}

export type TFormArray = IFormGroupArray | IFormFieldArray;

export interface IBaseFormArray extends IBaseFormGroupAndArray {
  groupType: FormGroupTypes.Array;
  number: number;
}

export interface IFormGroupArray extends IBaseFormArray {
  arrayType: FormArrayTypes.Group;
  fields: TField[];
}

export interface IFormFieldArray extends IBaseFormArray {
  arrayType: FormArrayTypes.Field;
  field: TField;
}

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

export interface IDatePickerField extends IBaseField {
  type: FormFieldTypes.DatePicker;
}

export interface ICheckBoxField extends IBaseField {
  type: FormFieldTypes.CheckBox;
}

export interface ISelectOption {
  display: string;
  value: any;
}

export interface ICustomInput extends IBaseField {
  type: string;
}

export type TField =
  | IInputField
  | ISelectField
  | IDatePickerField
  | ITextArea
  | ICheckBoxField
  | ICustomInput;

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
  Week = 'week',
}

// Muse be strings
export enum FormGroupTypes {
  Group = 'GROUP',
  Array = 'ARRAY',
}

export enum FormArrayTypes {
  Group = 'GROUP',
  Field = 'FIELD',
}

export enum FormFieldTypes {
  Input = 'INPUT',
  TextArea = 'TEXT_AREA',
  Select = 'SELECT',
  DatePicker = 'DATE_PICKER',
  CheckBox = 'CHECK_BOX',
}

export interface DynamicFormConfig {
  components: BaseComponentMap;
  errors?: DynamicFormErrorsMap;
}

export type BaseComponentMap = {
  [key in FormFieldTypes]: Type<any>;
};

export interface CustomComponentMap {
  [key: string]: Type<any>;
}

export interface DynamicFormComponentMap
  extends BaseComponentMap,
    CustomComponentMap {}
