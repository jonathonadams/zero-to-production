import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FormActions from './form-builder.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { IDynamicFormConfig } from '@ztp/common/dynamic-form';

export const formBuilderKey = 'formBuilder';

export interface FormBuilderEntityState
  extends EntityState<IDynamicFormConfig> {
  selectedFormName: string | null;
}

export const adapter: EntityAdapter<IDynamicFormConfig> = createEntityAdapter<
  IDynamicFormConfig
>({
  selectId: (a: IDynamicFormConfig) => a.formName,
});

export const initialState: FormBuilderEntityState = adapter.getInitialState({
  selectedFormName: null,
});

export const formsReducer = createReducer(
  initialState,
  on(FormActions.selectForm, (state, { formName }) => {
    return { ...state, selectedFormName: formName };
  }),
  on(FormActions.clearSelected, (state) => {
    return { ...state, selectedFormName: null };
  }),
  on(FormActions.loadFormsSuccess, (state, { forms }) => {
    return adapter.setAll(forms, state);
  }),
  on(FormActions.createFormSuccess, (state, { form }) => {
    return adapter.addOne(form, state);
  }),
  on(FormActions.updateFormSuccess, (state, { form }) => {
    return adapter.updateOne(form, state);
  }),
  on(FormActions.deleteFormSuccess, (state, { formName }) => {
    return adapter.removeOne(formName, state);
  })
);

export function reducer(
  state: FormBuilderEntityState | undefined,
  action: Action
) {
  return formsReducer(state, action);
}
