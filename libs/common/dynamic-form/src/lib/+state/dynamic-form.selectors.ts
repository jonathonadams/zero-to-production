import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDynamicForm from './dynamic-form.reducer';

const selectDynamicFormState = createFeatureSelector<
  fromDynamicForm.DynamicFormEntityState
>(fromDynamicForm.dynamicFormKey);

export const {
  selectIds: selectFormNames,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms,
  selectTotal
} = fromDynamicForm.adapter.getSelectors(selectDynamicFormState);

export function selectForm(formName: string) {
  return createSelector(selectFormEntities, forms => forms[formName]);
}

export function selectFormConfig(formName: string) {
  return createSelector(selectForm(formName), form =>
    form ? form.config : undefined
  );
}

export function selectFormStructure(formName: string) {
  return createSelector(selectForm(formName), form =>
    form ? form.config.structure : undefined
  );
}

export function selectFormData(formName: string) {
  return createSelector(selectForm(formName), form =>
    form ? form.data : undefined
  );
}

export function selectFormErrors(formName: string) {
  return createSelector(selectForm(formName), form =>
    form ? form.errors : undefined
  );
}

export function selectFormValidators(formName: string) {
  return createSelector(selectForm(formName), form =>
    form ? form.config.formValidators : undefined
  );
}

export function selectFormIndex(formName: string) {
  return createSelector(selectForm(formName), form =>
    form ? form.index : undefined
  );
}
