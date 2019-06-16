import { createAction, props } from '@ngrx/store';
import { Todo } from '@workspace/shared/data';
import { TodoFilterStatus } from '@workspace/shared/enums';
import { Update } from '@ngrx/entity';
import { GraphQLError } from 'graphql';

export const selectTodo = createAction(
  '[Todo/UI] Select',
  props<{ id: string }>()
);

export const clearSelected = createAction('[Todo/UI] Clear');

export const selectFilter = createAction(
  '[Todo/UI] Select Filter',
  props<{ filter: TodoFilterStatus }>()
);

export const searchFilter = createAction(
  '[Todo/UI] Search Filter',
  props<{ search: string }>()
);

export const loadTodos = createAction('[Todo/API] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo/API] Load Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFail = createAction(
  '[Todo/API] Load Fail',
  props<{ error: GraphQLError }>()
);

export const createTodo = createAction(
  '[Todo/API] Create ',
  props<{ todo: Todo }>()
);
export const createTodoSuccess = createAction(
  '[Todo/API] Create Success',
  props<{ todo: Todo }>()
);

export const createTodoFail = createAction(
  '[Todo/API] Create Fail',
  props<{ error: GraphQLError }>()
);

export const updateTodo = createAction(
  '[Todo/API] Update ',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo/API] Update Success',
  props<{ todo: Update<Todo> }>()
);

export const updateTodoFail = createAction(
  '[Todo/API] Update Fail',
  props<{ error: GraphQLError }>()
);

export const deleteTodo = createAction(
  '[Todo/API] Delete',
  props<{ todo: Todo }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo/API] Delete Success',
  props<{ id: string }>()
);

export const deleteTodoFail = createAction(
  '[Todo/API] Delete Fail',
  props<{ error: GraphQLError }>()
);
