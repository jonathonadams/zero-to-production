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
import { ITodo } from '@uqt/api/core-data';
import { TodoFilterStatus } from '@uqt/enums';

@Injectable()
export class TodosFacade {
  filteredTodo$: Observable<ITodo[]>;
  selectedTodo$: Observable<ITodo | undefined>;
  allTodoFilter$: Observable<TodoFilterStatus>;
  todoIds$: Observable<string[]>;

  constructor(private store: Store<any>) {
    this.filteredTodo$ = this.store.pipe(select(selectFilteredTodos));
    this.selectedTodo$ = this.store.pipe(select(selectCurrentTodo));
    this.allTodoFilter$ = this.store.pipe(select(selectTodoFilterStatus));
    this.todoIds$ = this.store.pipe(select(selectTodoIds)) as Observable<
      string[]
    >;
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

  public saveTodo(todo: ITodo): void {
    todo.id ? this.updateTodo(todo) : this.createTodo(todo);
  }

  public createTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  public updateTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  public deleteTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.deleteTodo({ todo }));
  }
}
