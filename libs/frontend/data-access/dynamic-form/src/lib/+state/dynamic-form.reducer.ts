import { createReducer, on, Action } from '@ngrx/store';
import * as FormActions from './dynamic-form.actions';
import { IFormErrors, TFormGroups } from '../form.models';
import { ValidatorFn } from '@angular/forms';

export interface DynamicFormState {
  config: IDynamicFormConfig;
  index: number;
  data: any;
  structure: TFormGroups;
  formValidators: ValidatorFn[];
  errors: IFormErrors | null;
}

export interface IDynamicFormConfig {
  animations?: boolean;
  paginateSections?: boolean;
}

export const initialFormConfig: IDynamicFormConfig = {
  animations: true,
  paginateSections: true
};

export const initialFormState: DynamicFormState = {
  config: initialFormConfig,
  index: 0,
  data: {},
  structure: [],
  formValidators: [],
  errors: null
};

export const formReducer = createReducer(
  initialFormState,
  on(FormActions.updateFormData, (state, { data }) => {
    return { ...state, data };
  }),
  on(FormActions.setFormStructure, (state, { structure }) => {
    return { ...state, structure: [...structure] };
  }),
  on(FormActions.setFormErrors, (state, { errors }) => {
    return { ...state, errors };
  }),
  on(FormActions.clearFormErrors, state => {
    return { ...state, errors: null };
  }),
  on(FormActions.resetForm, state => {
    return initialFormState;
  }),
  on(FormActions.resetFormValidators, state => {
    return { ...state, formValidators: [] };
  }),
  on(FormActions.setFormValidators, (state, { validators }) => {
    return { ...state, formValidators: validators };
  }),
  on(FormActions.resetIndex, state => {
    return { ...state, index: 0 };
  }),
  on(FormActions.gotToIndex, (state, { index }) => {
    return { ...state, index };
  }),
  // TODO -> Make sure the index's can not go out of range
  on(FormActions.nextIndex, state => {
    return { ...state, index: state.index + 1 };
  }),
  on(FormActions.backIndex, state => {
    return { ...state, index: state.index - 1 };
  }),
  on(FormActions.setFormConfig, (state, { config }) => {
    return { ...state, config: { ...state.config, ...config } };
  }),
  on(FormActions.resetFormConfig, state => {
    return { ...state, config: initialFormConfig };
  })
);

export function reducer(state: DynamicFormState | undefined, action: Action) {
  return formReducer(state, action);
}
