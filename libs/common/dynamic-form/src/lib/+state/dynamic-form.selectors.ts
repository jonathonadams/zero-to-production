import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDynamicForm from './dynamic-form.reducer';

const selectDynamicFormState = createFeatureSelector<
  fromDynamicForm.DynamicFormEntityState
>(fromDynamicForm.dynamicFormKey);

export const {
  selectIds: selectFormNames,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms,
  selectTotal,
} = fromDynamicForm.adapter.getSelectors(selectDynamicFormState);

export function selectForm(formName: string) {
  return createSelector(selectFormEntities, (forms) => forms[formName]);
}

/**
 * selectors only trigger when changes occur
 *
 * DO NOT DELETE, if you only select the top level state,
 * each time the store is updated with values it will cause
 * all other selectors to trigger.
 * this means the form will be build each time!!!
 */

export function selectFormErrors(formName: string) {
  return createSelector(selectForm(formName), (form) =>
    form ? form.errors : undefined
  );
}

export function selectFormConfig(formName: string) {
  return createSelector(selectForm(formName), (form) =>
    form ? form.config : undefined
  );
}

export function selectFormIndex(formName: string) {
  return createSelector(selectForm(formName), (form) =>
    form ? form.index : undefined
  );
}
export function selectFormStructure(formName: string) {
  return createSelector(selectFormConfig(formName), (config) =>
    config ? config.structure : undefined
  );
}

export function selectFormValidators(formName: string) {
  return createSelector(selectFormConfig(formName), (config) =>
    config ? config.formValidators : undefined
  );
}
