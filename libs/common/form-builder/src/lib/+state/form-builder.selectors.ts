import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFormBuilder from './form-builder.reducer';

export const selectFormState = createFeatureSelector<
  fromFormBuilder.FormBuilderEntityState
>(fromFormBuilder.formBuilderKey);

export const {
  selectIds: selectFormIds,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms,
} = fromFormBuilder.adapter.getSelectors(selectFormState);

export const selectCurrentFormName = createSelector(
  selectFormState,
  (state: fromFormBuilder.FormBuilderEntityState) => state.selectedFormName
);

export const selectCurrentForm = createSelector(
  selectFormEntities,
  selectCurrentFormName,
  (formEntities, formId) => formEntities[String(formId)]
);
