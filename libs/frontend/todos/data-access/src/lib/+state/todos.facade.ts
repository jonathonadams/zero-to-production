import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectCurrentTodo,
  selectFilteredTodos,
  selectTodoFilterStatus,
  selectTodoIds
} from './todos.selectors';
import * as TodoActions from './todos.actions';
import { Todo } from '@workspace/shared/data';
import { TodoFilterStatus } from '@workspace/shared/enums';

@Injectable()
export class TodosFacade {
  filteredTodo$: Observable<Todo[]>;
  selectedTodo$: Observable<Todo | undefined>;
  allTodoFilter$: Observable<TodoFilterStatus>;
  todoIds$: Observable<string[] | number[]>;

  constructor(private store: Store<any>) {
    this.filteredTodo$ = this.store.pipe(select(selectFilteredTodos));
    this.selectedTodo$ = this.store.pipe(select(selectCurrentTodo));
    this.allTodoFilter$ = this.store.pipe(select(selectTodoFilterStatus));
    this.todoIds$ = this.store.pipe(select(selectTodoIds));
  }

  public loadTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  public selectTodo(id: string): void {
    this.store.dispatch(TodoActions.selectTodo({ id }));
  }

  public clearSelected(): void {
    this.store.dispatch(TodoActions.clearSelected());
  }

  public statusChange(status: TodoFilterStatus) {
    this.store.dispatch(TodoActions.selectFilter({ filter: status }));
  }

  public searchStringChanged(search: string) {
    this.store.dispatch(TodoActions.searchFilter({ search }));
  }

  public saveTodo(todo: Todo): void {
    todo.id ? this.updateTodo(todo) : this.createTodo(todo);
  }

  public createTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  public updateTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  public deleteTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.deleteTodo({ todo }));
  }
}
