import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromTodos from './todos.selectors';
import * as TodoActions from './todos.actions';
import { ITodo } from '@uqt/data';
import { TodoFilterStatus } from './todos.reducer';

@Injectable()
export class TodosFacade {
  allTodos$: Observable<ITodo[]>;
  filteredTodo$: Observable<ITodo[]>;
  selectedTodo$: Observable<ITodo | undefined>;
  allTodoFilter$: Observable<TodoFilterStatus>;
  todoIds$: Observable<string[]>;

  constructor(private store: Store<any>) {
    this.allTodos$ = this.store.pipe(select(fromTodos.selectAllTodos));
    this.filteredTodo$ = this.store.pipe(select(fromTodos.selectFilteredTodos));
    this.selectedTodo$ = this.store.pipe(select(fromTodos.selectCurrentTodo));
    this.allTodoFilter$ = this.store.pipe(
      select(fromTodos.selectTodoFilterStatus)
    );
    this.todoIds$ = this.store.pipe(
      select(fromTodos.selectTodoIds)
    ) as Observable<string[]>;
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
