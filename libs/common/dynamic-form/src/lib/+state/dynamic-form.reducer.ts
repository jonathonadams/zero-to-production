import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as DynamicFormActions from './dynamic-form.actions';
import {
  DynamicFormState,
  IDynamicFormConfig,
} from '../dynamic-form.interface';

export const dynamicFormKey = 'dynamicForm';

export interface DynamicFormEntityState extends EntityState<DynamicFormState> {}

export function selectFormName(a: DynamicFormState): string {
  return a.config.formName;
}

export const adapter: EntityAdapter<DynamicFormState> = createEntityAdapter<
  DynamicFormState
>({
  selectId: selectFormName,
});

export const initialEntityFormState: DynamicFormEntityState = adapter.getInitialState();

export const formReducer = createReducer(
  initialEntityFormState,
  on(DynamicFormActions.createForm, (state, { formName }) => {
    // Only creates if it does not yet currently exist
    if ((state.ids as string[]).indexOf(formName) === -1) {
      return adapter.addOne(generateInitialFormState(formName), state);
    } else {
      return state;
    }
  }),
  on(DynamicFormActions.setFormConfig, (state, { formName, config }) => {
    const currentState = state.entities[formName] as DynamicFormState;
    if (currentState) {
      const newState = { ...currentState.config, ...config };
      return adapter.updateOne(
        { id: formName, changes: { config: newState } },
        state
      );
    } else {
      return state;
    }
  }),
  on(DynamicFormActions.updateFormDataState, (state, { formName, data }) => {
    return adapter.updateOne({ id: formName, changes: { data } }, state);
  }),
  on(DynamicFormActions.formErrorsComplete, (state, { formName, errors }) => {
    return adapter.updateOne({ id: formName, changes: { errors } }, state);
  }),
  on(DynamicFormActions.clearFormErrors, (state, { formName }) => {
    return adapter.updateOne({ id: formName, changes: { errors: [] } }, state);
  }),
  on(DynamicFormActions.gotToIndex, (state, { formName, index }) => {
    const currentState = state.entities[formName] as DynamicFormState;
    const newIndex =
      index >= 0 && index < currentState.config.structure.length
        ? index
        : currentState.index;
    return adapter.updateOne(
      { id: formName, changes: { index: newIndex } },
      state
    );
  }),
  on(DynamicFormActions.nextIndex, (state, { formName }) => {
    // This will never be undefined, as the action can only dispatched
    // from within the form with the currently set formName
    const currentState = state.entities[formName] as DynamicFormState;
    const index =
      currentState.index < currentState.config.structure.length - 1
        ? currentState.index + 1
        : currentState.index;

    return adapter.updateOne({ id: formName, changes: { index } }, state);
  }),
  on(DynamicFormActions.backIndex, (state, { formName }) => {
    // This will never be undefined, as the action can only dispatched
    // from within the form with the currently set formName
    const currentState = state.entities[formName] as DynamicFormState;
    const index = currentState.index <= 1 ? 0 : currentState.index - 1;
    return adapter.updateOne({ id: formName, changes: { index } }, state);
  }),
  on(DynamicFormActions.resetFormState, (state, { formName }) => {
    const currentState = state.entities[formName] as DynamicFormState;
    return adapter.updateOne(
      {
        id: formName,
        changes: resetFormState(currentState.config),
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

export function generateInitialFormConfig(
  config: Partial<IDynamicFormConfig>
): IDynamicFormConfig {
  return {
    ...{
      formName: '',
      enabled: true,
      animations: false,
      paginateSections: false,
      structure: [],
      formValidators: [],
    },
    ...config,
  };
}

function generateInitialFormState(formName: string): DynamicFormState {
  return {
    config: generateInitialFormConfig({ formName }),
    index: 0,
    data: {},
    errors: [],
  };
}

function resetFormState(config: IDynamicFormConfig): DynamicFormState {
  return {
    config: generateInitialFormConfig(config),
    index: 0,
    data: {},
    errors: [],
  };
}

function checkEntityAndThrow(entity: any, formName: string) {
  if (!entity)
    throw new Error(
      `${formName} form must be initialized before setting the config`
    );
}
