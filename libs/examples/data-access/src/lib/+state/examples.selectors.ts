import { createFeatureSelector } from '@ngrx/store';
import * as fromExamples from './examples.reducer';

export const selectExampleState = createFeatureSelector<
  fromExamples.ExamplesEntityState
>(fromExamples.exampleEntityStateKey);

export const {
  selectEntities: selectExampleEntities,
  selectAll: selectAllExamples,
} = fromExamples.adapter.getSelectors(selectExampleState);
