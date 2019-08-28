import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosEntityState, adapter } from './todos.reducer';
import { ITodo } from '@ngw/shared/interfaces';
import { TodoFilterStatus } from '@ngw/shared/enums';

// Select the top level 'todos' state.
export const selectTodoState = createFeatureSelector<TodosEntityState>(
  'todosState'
);

export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos
} = adapter.getSelectors(selectTodoState);

export const selectCurrentTodoId = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.selectedTodoId
);

export const selectTodoFilterStatus = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.statusFilter
);

export const selectTodoSearchFilter = createSelector(
  selectTodoState,
  (state: TodosEntityState) => state.searchFilter
);

export const selectCurrentTodo = createSelector(
  selectTodoEntities,
  selectCurrentTodoId,
  (todoEntities, todoId) => todoEntities[String(todoId)]
);

// TODO -> Refactor the filtering

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectTodoFilterStatus,
  selectTodoSearchFilter,
  (todos: ITodo[], status: TodoFilterStatus, searchString: string | null) => {
    if (statusCheck(TodoFilterStatus.All)(status)) {
      if (isEmptySearchString(searchString)) {
        return todos;
      } else {
        return todos.filter(todo =>
          isTodoInSearchString(todo, searchString as string)
        );
      }
    } else if (statusCheck(TodoFilterStatus.Completed)(status)) {
      if (isEmptySearchString(searchString)) {
        return todos.filter(isTodoComplete);
      } else {
        return todos.filter(
          todo =>
            isTodoComplete(todo) &&
            isTodoInSearchString(todo, searchString as string)
        );
      }
    } else if (statusCheck(TodoFilterStatus.InCompleted)(status)) {
      if (isEmptySearchString(searchString)) {
        return todos.filter(isTodoIncomplete);
      } else {
        return todos.filter(
          todo =>
            isTodoIncomplete(todo) &&
            isTodoInSearchString(todo, searchString as string)
        );
      }
    } else {
      return todos;
    }
  }
);

function isTodoComplete(todo: ITodo) {
  return todo.completed === true;
}

function isTodoIncomplete(todo: ITodo) {
  return !isTodoComplete(todo);
}

function statusCheck(status: TodoFilterStatus) {
  return function(currentStatus: TodoFilterStatus) {
    return status === currentStatus;
  };
}

function isEmptySearchString(text: string | null): boolean {
  return text === null || text === '';
}

function isTodoInSearchString(todo: ITodo, searchString: string): boolean {
  if (
    todo.title.toLowerCase().includes(searchString) ||
    todo.description.toLowerCase().includes(searchString)
  ) {
    return true;
  } else {
    return false;
  }
}
