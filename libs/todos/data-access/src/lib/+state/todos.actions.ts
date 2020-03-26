import { createAction, props } from '@ngrx/store';
import { ITodo, ITodoNote } from '@ztp/data';
import { TodoFilterStatus } from './todos.reducer';

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
  '[Todo/API] Load Todos Success',
  props<{ todos: ITodo[] }>()
);

export const loadTodosFail = createAction(
  '[Todo/API] Load Todos Fail',
  props<{ error: string }>()
);

export const loadTodo = createAction(
  '[Todo/API] Load Todo Notes',
  props<{ id: string }>()
);

export const loadTodoSuccess = createAction(
  '[Todo/API] Load Todo Success',
  props<{ todo: ITodo }>()
);

export const loadTodoFail = createAction(
  '[Todo/API] Load Todo Fail',
  props<{ error: string }>()
);

export const createTodo = createAction(
  '[Todo/API] Create ',
  props<{ todo: ITodo }>()
);
export const createTodoSuccess = createAction(
  '[Todo/API] Create Success',
  props<{ todo: ITodo }>()
);

export const createTodoFail = createAction(
  '[Todo/API] Create Fail',
  props<{ error: string }>()
);

export const updateTodo = createAction(
  '[Todo/API] Update ',
  props<{ todo: ITodo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo/API] Update Success',
  props<{ todo: ITodo }>()
);

export const updateTodoFail = createAction(
  '[Todo/API] Update Fail',
  props<{ error: string }>()
);

export const deleteTodo = createAction(
  '[Todo/API] Delete',
  props<{ todo: ITodo }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo/API] Delete Success',
  props<{ id: string }>()
);

export const deleteTodoFail = createAction(
  '[Todo/API] Delete Fail',
  props<{ error: string }>()
);

export const clearTodos = createAction('[Todo/API] Clear');

export const createTodoNote = createAction(
  '[Todo Note/API] Create Note',
  props<{ body: string }>()
);
export const createTodoNoteSuccess = createAction(
  '[Todo Note/API] Create Note Success',
  props<{ note: ITodoNote }>()
);

export const createTodoNoteFail = createAction(
  '[Todo Note/API] Create Note Fail',
  props<{ error: string }>()
);

export const deleteTodoNote = createAction(
  '[Todo Note/API] Delete Note',
  props<{ id: string }>()
);
export const deleteTodoNoteSuccess = createAction(
  '[Todo Note/API] Delete Note Success',
  props<{ note: ITodoNote }>()
);

export const deleteTodoNoteFail = createAction(
  '[Todo Note/API] Delete Note Fail',
  props<{ error: string }>()
);
