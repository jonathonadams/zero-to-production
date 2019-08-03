import { createReducer, on, Action } from '@ngrx/store';
import * as FormActions from './dynamic-form.actions';
import { IFormErrors, TFormGroups } from '../form.models';

export interface DynamicFormState {
  config: IDynamicFormConfig;
  index: number;
  data: any;
  structure: TFormGroups;
  valid: boolean;
  errors: IFormErrors;
  touched: boolean;
}

export interface IDynamicFormConfig {
  animations: boolean;
  paginateSections: boolean;
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
  }),
  on(FormActions.resetIdx, state => {
    return { ...state, index: 0 };
  }),
  on(FormActions.gotToIdx, (state, { idx }) => {
    return { ...state, index: idx };
  }),
  on(FormActions.nextIdx, state => {
    return { ...state, index: state.index + 1 };
  }),
  on(FormActions.backIdx, state => {
    return { ...state, index: state.index - 1 };
  }),
  on(FormActions.setFormConfig, (state, config) => {
    return { ...state, config };
  }),
  on(FormActions.resetFormConfig, state => {
    return { ...state, config: initialFormConfig };
  }),
  on(FormActions.enableAnimations, state => {
    return { ...state, config: { ...state.config, animations: true } };
  }),
  on(FormActions.disableAnimations, state => {
    return { ...state, config: { ...state.config, animations: false } };
  })
);

export function reducer(state: DynamicFormState | undefined, action: Action) {
  return formReducer(state, action);
}
