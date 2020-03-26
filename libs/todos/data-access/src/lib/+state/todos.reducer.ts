import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ITodo } from '@ztp/data';
import * as TodoActions from './todos.actions';

export enum TodoFilterStatus {
  All,
  Completed,
  InCompleted,
}

export const todosFeatureKey = 'todosFeatureState';

// 1. define the entity state
export interface TodosEntityState extends EntityState<ITodo> {
  // Add custom property state
  selectedTodoId: string | null;
  statusFilter: TodoFilterStatus;
  searchFilter: string;
  loaded: boolean;
}

// 2. Create entity adapter
export const adapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>();

// 3. Define the initial state
export const initialTodoState: TodosEntityState = adapter.getInitialState({
  selectedTodoId: null,
  statusFilter: TodoFilterStatus.InCompleted,
  searchFilter: '',
  loaded: false,
});

export const todosReducer = createReducer(
  initialTodoState,
  on(TodoActions.selectTodo, (state, { id }) => {
    return { ...state, selectedTodoId: id };
  }),
  on(TodoActions.clearSelected, (state) => {
    return { ...state, selectedTodoId: null };
  }),
  on(TodoActions.searchFilter, (state, { search }) => {
    return { ...state, searchFilter: search };
  }),
  on(TodoActions.selectFilter, (state, { filter }) => {
    return { ...state, statusFilter: filter };
  }),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => {
    return { ...adapter.setAll(todos, state), loaded: true };
  }),
  on(TodoActions.loadTodoSuccess, (state, { todo }) => {
    return adapter.upsertOne(todo, state);
  }),
  on(TodoActions.loadTodoSuccess, (state, { todo }) => {
    return adapter.upsertOne(todo, state);
  }),
  on(TodoActions.createTodoSuccess, (state, { todo }) => {
    return adapter.addOne(todo, state);
  }),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => {
    return adapter.updateOne({ id: todo.id, changes: todo }, state);
  }),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(TodoActions.clearTodos, (state) => {
    return { ...adapter.removeAll(state), loaded: false };
  })
);

export function reducer(state: TodosEntityState | undefined, action: Action) {
  return todosReducer(state, action);
}
