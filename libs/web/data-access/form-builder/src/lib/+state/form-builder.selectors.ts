import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormBuilderEntityState, adapter } from './form-builder.reducer';

export const selectFormState = createFeatureSelector<FormBuilderEntityState>(
  'formBuilderState'
);

export const {
  selectIds: selectFormIds,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms
} = adapter.getSelectors(selectFormState);

export const selectCurrentFormName = createSelector(
  selectFormState,
  (state: FormBuilderEntityState) => state.selectedFormName
);

export const selectCurrentForm = createSelector(
  selectFormEntities,
  selectCurrentFormName,
  (formEntities, formId) => formEntities[String(formId)]
);
