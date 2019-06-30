import { createReducer, on, Action } from '@ngrx/store';
import * as FormActions from './dynamic-form.actions';
import { Field, FormErrors } from '../form.models';

export interface DynamicFormState {
  data: any;
  structure: Field[];
  valid: boolean;
  errors: FormErrors;
  touched: boolean;
}

export const initialFormState: DynamicFormState = {
  data: {},
  structure: [],
  valid: true,
  errors: {},
  touched: false
};

export const formReducer = createReducer(
  initialFormState,
  on(FormActions.setFormData, (state, { data }) => {
    return { ...state, data };
  }),
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
    return { ...state, errors: {} };
  }),
  on(FormActions.initializeForm, state => {
    return initialFormState;
  }),
  on(FormActions.resetForm, state => {
    return { ...state, touched: true };
  })
);

export function reducer(state: DynamicFormState | undefined, action: Action) {
  return formReducer(state, action);
}
