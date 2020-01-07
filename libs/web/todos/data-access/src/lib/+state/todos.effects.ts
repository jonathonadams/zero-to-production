import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { logout } from '@uqt/data-access/auth';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as TodoActions from './todos.actions';
import { TodosService } from '../todos.service';
import { ITodo } from '@uqt/interfaces';

// Note: when merging observable from multiple sources there are 4x operators tha can be uses
// exhaustMap, mergeMap, switchMap and concatMap

// exhaustMap -> ignores subsequent request until the current one has completed
// use when you want the current one to complete. e.g. login or loading initial resources. Ignore everything else until it completes.

// mergeMap -> all effects happen concurrently. Nothing is aborted and all observables complete (or error)
// This is good for action where the order of completion does not matter as they may complete out of time.. i.e. deleting or adding an item.

// switchMap -> switches to the current observable as it. Note that it sends the unsubscribe (and subsequent cancel) to the current observable.
// This is generally not desired for API calls as the current request will be cancelled. i.e. if you spam the delete button the next click will
// cancel the current delete API call. This is undesired.

// concatMap -> merges the observable in the correct order. No observable is ignored and everything runs sequentially. Use this when order matters.

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodosService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      exhaustMap(action => this.todoService.getAllTodos()),
      map(({ errors, data }) =>
        errors
          ? TodoActions.loadTodosFail({ error: errors[0].message })
          : TodoActions.loadTodosSuccess({
              todos: (data as { allTodos: ITodo[] }).allTodos
            })
      ),
      catchError((error: HttpErrorResponse) =>
        of(TodoActions.loadTodosFail({ error: error.message }))
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.createTodo),
      mergeMap(({ todo }) =>
        this.todoService.createTodo(todo).pipe(
          map(({ errors, data }) =>
            errors
              ? TodoActions.createTodoFail({ error: errors[0].message })
              : TodoActions.createTodoSuccess({
                  todo: (data as { newTodo: ITodo }).newTodo
                })
          ),
          catchError((error: HttpErrorResponse) =>
            of(TodoActions.createTodoFail({ error: error.message }))
          )
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map(({ errors, data }) =>
            errors
              ? TodoActions.updateTodoFail({ error: errors[0].message })
              : TodoActions.updateTodoSuccess({
                  todo: {
                    id: todo.id,
                    changes: (data as { updateTodo: ITodo }).updateTodo
                  }
                })
          ),
          catchError((error: HttpErrorResponse) =>
            of(TodoActions.updateTodoFail({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ todo }) =>
        this.todoService.deleteTodo(todo.id).pipe(
          map(({ errors, data }) =>
            errors
              ? TodoActions.deleteTodoFail({ error: errors[0].message })
              : TodoActions.deleteTodoSuccess({ id: todo.id })
          ),
          catchError((error: HttpErrorResponse) =>
            of(TodoActions.deleteTodoFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Clear the user todos on logout
  clearTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),
      map(() => TodoActions.clearTodos())
    );
  });
}
