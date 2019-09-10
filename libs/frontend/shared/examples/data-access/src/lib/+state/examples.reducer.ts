import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ExampleActions from './examples.actions';
import { IExample } from '@ngw/shared/interfaces';
import { createReducer, on, Action } from '@ngrx/store';

// 1. define the entity state
export interface ExamplesEntityState extends EntityState<IExample> {
  selectedExampleId: string | null;
  searchFilter: string | null;
}

// 2. Create entity adapter
export const adapter: EntityAdapter<IExample> = createEntityAdapter<IExample>();

// 3. Define the initial state
export const initialExampleState: ExamplesEntityState = adapter.getInitialState(
  {
    selectedExampleId: null,
    searchFilter: null
  }
);

export const examplesReducer = createReducer(
  initialExampleState,
  on(ExampleActions.selectExample, (state, { id }) => {
    return { ...state, selectedExampleId: id };
  }),
  on(ExampleActions.clearSelected, state => {
    return { ...state, selectedExampleId: null };
  }),
  on(ExampleActions.searchFilter, (state, { search }) => {
    return { ...state, searchFilter: search };
  }),
  on(ExampleActions.addExamples, (state, { examples }) => {
    return adapter.addAll(examples, state);
  })
);

export function reducer(
  state: ExamplesEntityState | undefined,
  action: Action
) {
  return examplesReducer(state, action);
}
