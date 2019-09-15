import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormsEntityState, adapter } from './form-builder.reducer';

// Select the top level 'forms' state.
export const selectFormState = createFeatureSelector<FormsEntityState>(
  'formsState'
);

export const {
  selectIds: selectFormIds,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms
} = adapter.getSelectors(selectFormState);

export const selectCurrentFormId = createSelector(
  selectFormState,
  (state: FormsEntityState) => state.selectedFormId
);

export const selectCurrentForm = createSelector(
  selectFormEntities,
  selectCurrentFormId,
  (formEntities, formId) => formEntities[String(formId)]
);
