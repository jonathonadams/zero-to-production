import { createFeatureSelector } from '@ngrx/store';
import { ExamplesEntityState, adapter } from './examples.reducer';

export const selectExampleState = createFeatureSelector<ExamplesEntityState>(
  'examplesState'
);

export const {
  selectEntities: selectExampleEntities,
  selectAll: selectAllExamples
} = adapter.getSelectors(selectExampleState);
