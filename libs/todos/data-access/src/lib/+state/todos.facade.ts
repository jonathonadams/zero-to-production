import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromTodos from './todos.selectors';
import * as TodoActions from './todos.actions';
import { ITodo } from '@ztp/data';
import { TodoFilterStatus } from './todos.reducer';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  allTodos$: Observable<ITodo[]>;
  filteredTodo$: Observable<ITodo[]>;
  selectedTodo$: Observable<ITodo | undefined>;
  allTodoFilter$: Observable<TodoFilterStatus>;
  todoIds$: Observable<string[]>;
  todosLoaded$: Observable<boolean>;

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
    this.todosLoaded$ = this.store.pipe(select(fromTodos.selectLoaded));
  }

  loadTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  loadTodo(id: string): void {
    this.store.dispatch(TodoActions.loadTodo({ id }));
  }

  selectTodo(id: string): void {
    this.store.dispatch(TodoActions.selectTodo({ id }));
  }

  clearSelected(): void {
    this.store.dispatch(TodoActions.clearSelected());
  }

  statusChange(status: TodoFilterStatus) {
    this.store.dispatch(TodoActions.selectFilter({ filter: status }));
  }

  searchStringChanged(search: string) {
    this.store.dispatch(TodoActions.searchFilter({ search }));
  }

  createTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  updateTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  deleteTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.deleteTodo({ todo }));
  }

  createTodoNote(body: string): void {
    this.store.dispatch(TodoActions.createTodoNote({ body }));
  }

  deleteTodoNote(id: string): void {
    this.store.dispatch(TodoActions.deleteTodoNote({ id }));
  }
}
