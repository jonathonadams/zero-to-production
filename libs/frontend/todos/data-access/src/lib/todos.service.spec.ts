import { TestBed } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ALL_TODOS_QUERY,
  LOAD_TODO_QUERY,
  CREATE_TODO_QUERY,
  UPDATE_TODO_QUERY,
  REMOTE_TODO_QUERY
} from './todos.queries';
import { JWTAuthService } from '@workspace/frontend/shared/auth';
import { GraphQLService } from '@workspace/frontend/shared/data-access';
import {
  GraphQLStub,
  createSpyObj
} from '@workspace/frontend/utils/test-helpers';
import { Todo, DecodedJWT } from '@workspace/shared/data';

describe('TodoService', () => {
  let service: TodosService;
  let authService: JWTAuthService;
  let graphQLService: GraphQLService;
  const authSpy = createSpyObj('JWTAuthService', ['getDecodedToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TodosService,
        { provide: GraphQLService, useClass: GraphQLStub },
        { provide: JWTAuthService, useValue: authSpy }
      ]
    });

    service = TestBed.get<TodosService>(TodosService);
    authService = TestBed.get<JWTAuthService>(JWTAuthService);
    graphQLService = TestBed.get<GraphQLService>(GraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllTodos', () => {
    it('should call the GraphQL service with the allTodos query', () => {
      const spy = jest.spyOn(graphQLService, 'query');

      service.getAllTodos();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(ALL_TODOS_QUERY);

      spy.mockReset();
    });
  });

  describe('getOneTodo', () => {
    it('should call the GraphQL service with the loadTodo query with the todo id', () => {
      const spy = jest.spyOn(graphQLService, 'query');

      service.getOneTodo('1');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(LOAD_TODO_QUERY, { id: '1' });

      spy.mockReset();
    });
  });

  describe('createTodo', () => {
    it('should call the GraphQL service with the newTodo mutation with the todo', () => {
      const spy = jest.spyOn(graphQLService, 'mutation');

      const originalTodo: Todo = {
        user: '1',
        title: 'some title',
        description: 'some description'
      } as Todo;

      const sentTodo = {
        ...originalTodo,
        completed: false,
        user: '1'
      } as Todo;
      authService.getDecodedToken = jest.fn(() => {
        return {
          sub: '1'
        } as DecodedJWT;
      });
      service.createTodo(originalTodo);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(CREATE_TODO_QUERY, { input: sentTodo });

      spy.mockReset();
    });
  });

  describe('updateTodo', () => {
    it('should call the GraphQL service with the updateTodo mutation with the updated todo', () => {
      const spy = jest.spyOn(graphQLService, 'mutation');

      const updatedTodo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      service.updateTodo(updatedTodo);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(UPDATE_TODO_QUERY, {
        input: updatedTodo
      });

      spy.mockReset();
    });
  });

  describe('deleteTodo', () => {
    it('should call the GraphQL service with the removeTodo mutation with the todo id to remove', () => {
      const spy = jest.spyOn(graphQLService, 'mutation');

      const todo: Todo = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };

      service.deleteTodo(todo.id);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(REMOTE_TODO_QUERY, { id: '1' });

      spy.mockReset();
    });
  });
});

// describe('loadTodos', () => {
//   it('should call the api service with /todos', () => {
//     const spy = jest.spyOn(apiService, 'get');

//     service.getAllTodos();

//     expect(spy).toHaveBeenCalled();
//     expect(spy).toHaveBeenCalledWith('todos');

//     spy.mockReset();
//   });
// });

// describe('getTodo', () => {
//   it('should make a GET request to the api server with the resource id', () => {
//     const spy = jest.spyOn(apiService, 'get');

//     service.getOneTodo('1');

//     expect(spy).toHaveBeenCalled();
//     expect(spy).toHaveBeenCalledWith('todos/1');

//     spy.mockReset();
//   });
// });

// describe('createTodo', () => {
//   it('should make a POST request to the api server with the resource to create', () => {
//     const spy = jest.spyOn(apiService, 'post');

//     const todo: Todo = {
//       user: '1',
//       title: 'some title',
//       description: 'some description',
//       completed: true
//     } as Todo;

//     authService.getDecodedToken = jest.fn(() => {
//       return {
//         sub: '1'
//       } as DecodedJWT;
//     });
//     service.createTodo(todo);

//     expect(spy).toHaveBeenCalled();
//     expect(spy.mock.calls[0][0]).toEqual('todos');
//     expect(spy.mock.calls[0][1]).toEqual(todo);

//     spy.mockReset();
//   });
// });

// describe('updateTodo', () => {
//   it('should make a PUT request to the api server with the resource to update', () => {
//     const spy = jest.spyOn(apiService, 'put');

//     const todo: Todo = {
//       id: '1',
//       user: '1',
//       title: 'some title',
//       description: 'some description',
//       completed: true
//     };

//     service.updateTodo(todo);

//     expect(spy).toHaveBeenCalled();
//     expect(spy.mock.calls[0][0]).toEqual('todos');
//     expect(spy.mock.calls[0][1]).toEqual(todo);

//     spy.mockReset();
//   });
// });

// describe('deleteTodo', () => {
//   it('should make a DELETE request to the api server with the resource to update', () => {
//     const spy = jest.spyOn(apiService, 'delete');

//     const todo: Todo = {
//       id: '1',
//       user: '1',
//       title: 'some title',
//       description: 'some description',
//       completed: true
//     };

//     service.deleteTodo(todo.id);

//     expect(spy).toHaveBeenCalled();
//     expect(spy.mock.calls[0][0]).toEqual('todos');
//     expect(spy.mock.calls[0][1]).toEqual(todo.id);

//     spy.mockReset();
//   });
// });
