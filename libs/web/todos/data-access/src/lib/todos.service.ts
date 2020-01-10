import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GraphQLService } from '@uqt/data-access/api';
import { AuthService, IJWTPayload } from '@uqt/data-access/auth';
import {
  ALL_TODOS_QUERY,
  LOAD_TODO_QUERY,
  CREATE_TODO_QUERY,
  UPDATE_TODO_QUERY,
  REMOTE_TODO_QUERY
} from './todos.queries';
import { ITodo } from '@uqt/interfaces';
import { FetchResult } from 'apollo-link';

@Injectable()
export class TodosService {
  constructor(private graphQl: GraphQLService, private auth: AuthService) {}

  public getAllTodos(): Observable<FetchResult<{ allTodos: ITodo[] }>> {
    return this.graphQl.query<{ allTodos: ITodo[] }>(ALL_TODOS_QUERY);
  }

  public getOneTodo(id: string): Observable<FetchResult<{ Todo: ITodo }>> {
    return this.graphQl.query<{ Todo: ITodo }>(LOAD_TODO_QUERY, { id });
  }

  public createTodo(todo: ITodo): Observable<FetchResult<{ newTodo: ITodo }>> {
    // Set the user id of the current JWT id
    const userId = (this.auth.getDecodedToken() as IJWTPayload).sub;
    const newTodo: ITodo = { ...todo, userId };
    // set the completed state to false
    // todo.completed = false;
    const variables = { input: newTodo };

    return this.graphQl.mutation<{ newTodo: ITodo }>(
      CREATE_TODO_QUERY,
      variables
    );
  }

  public updateTodo(
    todo: ITodo
  ): Observable<FetchResult<{ updateTodo: ITodo }>> {
    const variables = { input: todo };

    return this.graphQl.mutation<{ updateTodo: ITodo }>(
      UPDATE_TODO_QUERY,
      variables
    );
  }

  public deleteTodo(
    id: string
  ): Observable<FetchResult<{ removeTodo: { id: string } }>> {
    const variables = { id };

    return this.graphQl.mutation<{ removeTodo: { id: string } }>(
      REMOTE_TODO_QUERY,
      variables
    );
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
