import curryN from 'ramda/src/curryN';
import equals from 'ramda/src/equals';
import or from 'ramda/src/or';
import toLower from 'ramda/src/toLower';

import { ITodo } from '@uqt/interfaces';
import { TodoFilterStatus } from './todos.reducer';

function checkTodoCompleteStatus(completeStatus: boolean, todo: ITodo) {
  return equals(completeStatus, todo.completed);
}

export const checkTodoCompleteStatusC = curryN(2, checkTodoCompleteStatus);

export const equalsC = curryN(2, equals);

function isTodoInSearchString(searchString: string, todo: ITodo): boolean {
  return or(
    toLower(todo.title).includes(searchString),
    toLower(todo.description).includes(searchString)
  );
}

export const isTodoInSearchStringC = curryN(2, isTodoInSearchString);

export function todoFilterStatusCheck(filterStatus: TodoFilterStatus) {
  return filterStatus === TodoFilterStatus.Completed;
}
