import { createAction, props } from '@ngrx/store';
import { ValidationErrors } from '@angular/forms';
import { IDynamicFormConfig } from '../dynamic-form.interface';

export const createForm = createAction(
  '[Dynamic Form] Create',
  props<{ formName: string }>()
);

export const setFormConfig = createAction(
  '[Dynamic Form] Set Config',
  props<{
    formName: string;
    config: Partial<IDynamicFormConfig>;
  }>()
);

export const updateFormData = createAction(
  '[Dynamic Form] Update Data',
  props<{ formName: string; data: any }>()
);

export const setFormErrors = createAction(
  '[Dynamic Form] Set Errors',
  props<{ formName: string; errors: ValidationErrors }>()
);

export const formErrorsComplete = createAction(
  '[Dynamic Form] Set Errors Complete',
  props<{ formName: string; errors: string[] }>()
);

export const gotToIndex = createAction(
  '[Dynamic Form] Go To',
  props<{ formName: string; index: number }>()
);

export const nextIndex = createAction(
  '[Dynamic Form] Next',
  props<{ formName: string }>()
);

export const backIndex = createAction(
  '[Dynamic Form] Back',
  props<{ formName: string }>()
);

export const clearFormErrors = createAction(
  '[Dynamic Form] Clear Errors',
  props<{ formName: string }>()
);

// Action to trigger a submit, i.e trigger from the facade
export const triggerSubmit = createAction(
  '[Dynamic Form] Trigger Submit',
  props<{ formName: string }>()
);

// Action if there are no errors, and a submit from e observable if fired
export const submitForm = createAction(
  '[Dynamic Form] Form Submit',
  props<{ formName: string; data: any }>()
);

export const resetFormState = createAction(
  '[Dynamic Form] Reset State',
  props<{ formName: string }>()
);
