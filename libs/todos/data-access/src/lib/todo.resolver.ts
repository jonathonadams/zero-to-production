import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import {
  take,
  filter,
  tap,
  switchMap,
  timeout,
  catchError,
} from 'rxjs/operators';
import { ITodo } from '@uqt/data';
import { TodosFacade } from './+state/todos.facade';

@Injectable({ providedIn: 'root' })
export class TodoResolver implements Resolve<ITodo> {
  constructor(private facade: TodosFacade, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ITodo> | Observable<never> {
    const todoId = route.paramMap.get('todoId') as string;
    this.facade.selectTodo(todoId);

    return this.facade.todosLoaded$.pipe(
      tap((loaded) => (!loaded ? this.facade.loadTodos() : undefined)),
      switchMap(() => this.facade.selectedTodo$ as Observable<ITodo>),
      filter((user) => user !== undefined),
      take(1),
      timeout(500),
      catchError((err: any) => {
        this.facade.clearSelected();
        // Navigate to the parent by subtracting the length of the todoId plus the '/'
        const backRoute = state.url.substring(
          0,
          state.url.length - todoId.length - 1
        );
        this.router.navigate([backRoute]);
        return EMPTY;
      })
    );
  }
}
