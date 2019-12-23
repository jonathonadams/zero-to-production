import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FormActions from './dynamic-form.actions';
import { ValidatorFn } from '@angular/forms';
import { TFormGroups } from '../dynamic-form.interface';

export interface DynamicFormEntityState extends EntityState<DynamicFormState> {}

export function selectFormName(a: DynamicFormState): string {
  return a.formName;
}

export const adapter: EntityAdapter<DynamicFormState> = createEntityAdapter<
  DynamicFormState
>({
  selectId: selectFormName
});

export const initialEntityFormState: DynamicFormEntityState = adapter.getInitialState();

export interface DynamicFormState {
  formName: string;
  config: IDynamicFormConfig;
  index: number;
  data: any;
  structure: TFormGroups;
  formValidators: ValidatorFn[];
  errors: string[];
}

export interface IDynamicFormConfig {
  animations: boolean;
  paginateSections: boolean;
}

export const initialFormConfig: IDynamicFormConfig = {
  animations: true,
  paginateSections: true
};

export const formReducer = createReducer(
  initialEntityFormState,
  on(FormActions.createForm, (state, { formName }) => {
    // Only creates if it does not yet currently exist
    if ((state.ids as string[]).indexOf(formName) === -1) {
      return adapter.addOne(generateInitialFormState(formName), state);
    } else {
      return state;
    }
  }),
  on(FormActions.setFormStructure, (state, { formName, structure }) => {
    return adapter.updateOne({ id: formName, changes: { structure } }, state);
  }),
  on(FormActions.updateFormData, (state, { formName, data }) => {
    return adapter.updateOne({ id: formName, changes: { data } }, state);
  }),
  on(FormActions.formErrorsComplete, (state, { formName, errors }) => {
    return adapter.updateOne({ id: formName, changes: { errors } }, state);
  }),
  on(FormActions.clearFormErrors, (state, { formName }) => {
    return adapter.updateOne({ id: formName, changes: { errors: [] } }, state);
  }),
  on(FormActions.resetFormValidators, (state, { formName }) => {
    return adapter.updateOne(
      { id: formName, changes: { formValidators: [] } },
      state
    );
  }),
  on(FormActions.setFormValidators, (state, { formName, validators }) => {
    return adapter.updateOne(
      { id: formName, changes: { formValidators: validators } },
      state
    );
  }),
  on(FormActions.gotToIndex, (state, { formName, index }) => {
    const currentState = state.entities[formName] as DynamicFormState;
    const newIndex =
      index >= 0 && index < currentState.structure.length
        ? index
        : currentState.index;
    return adapter.updateOne(
      { id: formName, changes: { index: newIndex } },
      state
    );
  }),
  on(FormActions.nextIndex, (state, { formName }) => {
    // This will never be undefined, as the action can only dispatched
    // from within the form with the currently set formName
    const currentState = state.entities[formName] as DynamicFormState;
    const index =
      currentState.index < currentState.structure.length - 1
        ? currentState.index + 1
        : currentState.index;

    return adapter.updateOne({ id: formName, changes: { index } }, state);
  }),
  on(FormActions.backIndex, (state, { formName }) => {
    // This will never be undefined, as the action can only dispatched
    // from within the form with the currently set formName
    const currentState = state.entities[formName] as DynamicFormState;
    const index = currentState.index <= 1 ? 0 : currentState.index - 1;
    return adapter.updateOne({ id: formName, changes: { index } }, state);
  }),
  on(FormActions.setFormConfig, (state, { formName, config }) => {
    const currentState = state.entities[formName];
    if (!currentState)
      throw new Error(
        `${formName} form must be initialized before setting the config`
      );
    return adapter.updateOne(
      {
        id: formName,
        changes: { config: { ...currentState.config, ...config } }
      },
      state
    );
  })
);

export function reducer(
  state: DynamicFormEntityState | undefined,
  action: Action
) {
  return formReducer(state, action);
}

function generateInitialFormState(formName: string): DynamicFormState {
  return {
    formName,
    config: initialFormConfig,
    index: 0,
    data: {},
    structure: [],
    formValidators: [],
    errors: []
  };
}
