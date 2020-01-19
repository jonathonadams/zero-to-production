import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ExampleActions from './examples.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { IExample } from '../example.interface';

export const exampleEntityStateKey = 'examplesState';

export interface ExamplesEntityState extends EntityState<IExample> {}

export const adapter: EntityAdapter<IExample> = createEntityAdapter<IExample>();

export const initialExampleState: ExamplesEntityState = adapter.getInitialState();

export const examplesReducer = createReducer(
  initialExampleState,
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
