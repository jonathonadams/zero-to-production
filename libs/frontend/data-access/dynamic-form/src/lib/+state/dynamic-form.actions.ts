import { createAction, props } from '@ngrx/store';
import { IFormErrors, TFormGroups } from '../form.models';
import { IDynamicFormConfig } from './dynamic-form.reducer';

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
  props<{ structure: TFormGroups }>()
);

export const setFormErrors = createAction(
  '[Dynamic Form] Set Errors',
  props<{ errors: IFormErrors }>()
);

export const gotToIdx = createAction(
  '[Dynamic Form] Go To',
  props<{ idx: number }>()
);

export const nextIdx = createAction('[Dynamic Form] Next');

export const backIdx = createAction('[Dynamic Form] Back');

export const resetIdx = createAction('[Dynamic Form] Reset');

export const clearFormErrors = createAction('[Dynamic Form] Clear Errors');

export const initializeForm = createAction('[Dynamic Form] Initialize ');

export const resetForm = createAction('[Dynamic Form] Reset ');

export const setFormConfig = createAction(
  '[Dynamic Form] Set Config',
  props<IDynamicFormConfig>()
);

export const resetFormConfig = createAction('[Dynamic Form] Reset Config');

export const enableAnimations = createAction(
  '[Dynamic Form] Enable Animations'
);
export const disableAnimations = createAction(
  '[Dynamic Form] Disable Animations'
);
