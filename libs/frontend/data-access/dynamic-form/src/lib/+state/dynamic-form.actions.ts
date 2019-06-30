import { createAction, props } from '@ngrx/store';
import { Field, FormErrors } from '../form.models';

export const setFormData = createAction(
  '[Dynamic Form] Set Data',
  props<{ data: any }>()
);

export const updateFormData = createAction(
  '[Dynamic Form] Update Data',
  props<{ data: any }>()
);

export const setFormStructure = createAction(
  '[Dynamic Form] Set Structure',
  props<{ structure: Field[] }>()
);

export const setFormErrors = createAction(
  '[Dynamic Form] Set Errors',
  props<{ errors: FormErrors }>()
);

export const clearFormErrors = createAction('[Dynamic Form] Clear Errors');

export const initializeForm = createAction('[Dynamic Form] Initialize ');

export const resetForm = createAction('[Dynamic Form] Reset ');
