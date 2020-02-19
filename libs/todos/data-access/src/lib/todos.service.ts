import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  ALL_TODOS_QUERY,
  LOAD_TODO_QUERY,
  CREATE_TODO_QUERY,
  UPDATE_TODO_QUERY,
  REMOVE_TODO_QUERY
} from './todos.queries';
import { ITodo } from '@uqt/data';
import { FetchResult } from 'apollo-link';

@Injectable()
export class TodosService {
  constructor(private apollo: Apollo) {}

  public getAllTodos(): Observable<FetchResult<{ allTodos: ITodo[] }>> {
    return this.apollo.query<{ allTodos: ITodo[] }>({ query: ALL_TODOS_QUERY });
  }

  public getOneTodo(id: string): Observable<FetchResult<{ Todo: ITodo }>> {
    return this.apollo.query<{ Todo: ITodo }>({
      query: LOAD_TODO_QUERY,
      variables: { id }
    });
  }

  public createTodo(todo: ITodo): Observable<FetchResult<{ newTodo: ITodo }>> {
    const todoToSave: ITodo = { ...todo, completed: false };
    // set the completed state to false
    const variables = { input: todoToSave };

    // Add the new Todo to the Apollo Cache 'allTodos' after create
    return this.apollo.mutate<{ newTodo: ITodo }>({
      mutation: CREATE_TODO_QUERY,
      variables,
      update: (store, { data }) => {
        if (data) {
          const { newTodo } = data;
          // Read the data from our cache for this query.
          const todos: { allTodos: ITodo[] } | null = store.readQuery({
            query: ALL_TODOS_QUERY
          });

          const allTodos = todos ? [...todos.allTodos, newTodo] : [newTodo];
          store.writeQuery({ query: ALL_TODOS_QUERY, data: { allTodos } });
        }
      }
    });
  }

  public updateTodo(
    updatedTodo: ITodo
  ): Observable<FetchResult<{ updateTodo: ITodo }>> {
    const variables = { input: updatedTodo };

    return this.apollo.mutate<{ updateTodo: ITodo }>({
      mutation: UPDATE_TODO_QUERY,
      variables
    });
  }

  public deleteTodo(
    id: string
  ): Observable<FetchResult<{ removeTodo: { id: string } }>> {
    const variables = { id };

    // Remove the todo from the apollo cache
    return this.apollo.mutate<{ removeTodo: { id: string } }>({
      mutation: REMOVE_TODO_QUERY,
      variables,
      update: (store, { data }) => {
        if (data) {
          const { removeTodo } = data;
          // Read the data from our cache for this query.
          const todos: { allTodos: ITodo[] } | null = store.readQuery({
            query: ALL_TODOS_QUERY
          });

          const allTodos = todos
            ? todos.allTodos.filter(todo => todo.id !== removeTodo.id)
            : [];
          store.writeQuery({ query: ALL_TODOS_QUERY, data: { allTodos } });
        }
      }
    });
  }

  // ------------------------------------------
  // The below functions can be used if you would
  // like to use REST based API calls
  // ------------------------------------------

  // public getAllTodos(): Observable<Todo[]> {
  //   return this.api.get<Todo[]>(`todos`);
  // }

  // public getOneTodo(id: string): Observable<Todo> {
  //   return this.api.get<Todo>(`todos/${id}`);
  // }

  // public createTodo(todo: Todo): Observable<Todo> {
  //   // Set the user id of the current JWT id
  //   todo.user = this.auth.getDecodedToken().sub;
  //   return this.api.post<Todo>('todos', todo);
  // }

  // public updateTodo(todo: Todo): Observable<Todo> {
  //   return this.api.put<Todo>('todos', todo);
  // }

  // public deleteTodo(todo: Todo): Observable<Todo> {
  //   return this.api.delete<Todo>('todos', todo.id);
  // }
}
