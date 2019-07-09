import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosEntityState, adapter } from './todos.reducer';
import { ITodo } from '@workspace/shared/interfaces';
import { TodoFilterStatus } from '@workspace/shared/enums';

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
  (todoEntities, todoId) => todoEntities[`${todoId}`] // TODO  -> Coercion because TS strict => true
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectTodoFilterStatus,
  selectTodoSearchFilter,
  (
    todos: ITodo[],
    selection: TodoFilterStatus,
    searchString: string | null
  ) => {
    if (selection === TodoFilterStatus.All) {
      if (searchString === null || searchString === '') {
        return todos;
      } else {
        return todos.filter(todo => isTodoInSearchString(todo, searchString));
      }
    } else if (selection === TodoFilterStatus.Completed) {
      if (searchString === null || searchString === '') {
        return todos.filter(todo => todo.completed === true);
      } else {
        return todos.filter(
          todo =>
            todo.completed === true && isTodoInSearchString(todo, searchString)
        );
      }
    } else if (selection === TodoFilterStatus.InCompleted) {
      if (searchString === null || searchString === '') {
        return todos.filter(todo => todo.completed === false);
      } else {
        return todos.filter(
          todo =>
            todo.completed === false && isTodoInSearchString(todo, searchString)
        );
      }
    } else {
      return todos;
    }
  }
);

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
