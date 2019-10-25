import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExamplesEntityState, adapter } from './examples.reducer';
import { IExample } from '@ngw/types';

export const selectExampleState = createFeatureSelector<ExamplesEntityState>(
  'examplesState'
);

export const {
  selectEntities: selectExampleEntities,
  selectAll: selectAllExamples
} = adapter.getSelectors(selectExampleState);

export const selectCurrentExampleId = createSelector(
  selectExampleState,
  (state: ExamplesEntityState) => state.selectedExampleId
);

export const selectExampleSearchFilter = createSelector(
  selectExampleState,
  (state: ExamplesEntityState) => state.searchFilter
);

export const selectCurrentExample = createSelector(
  selectExampleEntities,
  selectCurrentExampleId,
  (exampleEntities, exampleId) => exampleEntities[String(exampleId)]
);

// EXAMPLE -> Refactor the filtering

export const selectFilteredExamples = createSelector(
  selectAllExamples,
  selectExampleSearchFilter,
  (examples: IExample[], searchString: string | null) => {
    if (isEmptySearchString(searchString)) {
      return examples;
    } else {
      return examples.filter(example =>
        isExampleInSearchString(example, searchString as string)
      );
    }
  }
);

function isEmptySearchString(text: string | null): boolean {
  return text === null || text === '';
}

function isExampleInSearchString(
  example: IExample,
  searchString: string
): boolean {
  if (
    example.title.toLowerCase().includes(searchString) ||
    example.description.toLowerCase().includes(searchString)
  ) {
    return true;
  } else {
    return false;
  }
}
