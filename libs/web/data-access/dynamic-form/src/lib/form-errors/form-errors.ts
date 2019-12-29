import { InjectionToken } from '@angular/core';

// https://angular.io/api/forms/Validators

export enum FormErrorTypes {
  required = 'required',
  email = 'email',
  min = 'min',
  max = 'max',
  minlength = 'minlength',
  maxlength = 'maxlength',
  pattern = 'pattern'
}

export type DynamicFormErrorsMap = {
  [key in FormErrorTypes]: string;
};

export const defaultErrorMessages: DynamicFormErrorsMap = {
  required: 'is required',
  email: 'is not a valid email',
  min: 'is less than the minimum allowed',
  max: 'is greater than the maximum allowed',
  minlength: 'is less than the minimum length allowed',
  maxlength: 'is greater than the maximum length allowed',
  pattern: 'does not meet the required pattern'
};

export const DYNAMIC_FORM_ERRORS = new InjectionToken<DynamicFormErrorsMap>(
  'DYNAMIC_FORM_ERRORS'
);
