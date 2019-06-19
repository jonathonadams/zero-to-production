// A reducer is just a pure function, it takes inputs and return a value when called
// Because it is pure function we do not need to configure any of angular testing
// module because it does not need of angular configuration to operate.
// We can also just use snapshot testing to test the output of the function
// and not need to use assertion testing
import { todosReducer, TodosEntityState } from './todos.reducer';
import * as TodoActions from './todos.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '@workspace/shared/data';
import { TodoFilterStatus } from '@workspace/shared/enums';

describe('TodoReducer', () => {
  let adapter: EntityAdapter<Todo>;

  const todo: Todo = {
    id: '1',
    user: '1',
    title: 'some title',
    description: 'some description',
    completed: true
  };
  const initialState: TodosEntityState = {
    ids: [todo.id],
    entities: {
      [todo.id]: todo
    },
    selectedTodoId: null,
    statusFilter: TodoFilterStatus.InCompleted,
    searchFilter: null
  };

  beforeEach(() => {
    adapter = createEntityAdapter<Todo>();
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const result = todosReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('LoadSuccess', () => {
    it('should add the todos to the todo state', () => {
      const todos: Todo[] = [
        {
          id: '1',
          user: '1',
          title: 'some title',
          description: 'some description',
          completed: true
        },
        {
          id: '2',
          user: '1',
          title: 'another title',
          description: 'another description',
          completed: false
        }
      ];

      const action = TodoActions.loadTodosSuccess({ todos });
      const result = todosReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('CreateSuccess', () => {
    it('should add a todo to the todo state', () => {
      const newTodo = {
        id: '2',
        user: '1',
        title: 'another title',
        description: 'another description',
        completed: false
      };

      const action = TodoActions.createTodoSuccess({ todo: newTodo });
      const result = todosReducer(initialState, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('UpdateSuccess', () => {
    it('should update the todo state', () => {
      const todo1 = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: false
      };
      const todo2 = { ...todo1, id: '2', title: 'anotherTodo' };

      const state: TodosEntityState = {
        ids: [todo1.id, todo2.id],
        entities: {
          [todo1.id]: todo1,
          [todo2.id]: todo2
        },
        selectedTodoId: null,
        statusFilter: TodoFilterStatus.InCompleted,
        searchFilter: null
      };

      const updateTodo = {
        id: '2',
        completed: true
      } as Todo;

      const action = TodoActions.updateTodoSuccess({
        todo: { id: updateTodo.id, changes: updateTodo }
      });
      const result = todosReducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });

  describe('DeleteSuccess', () => {
    it('should delete the todo from the sate', () => {
      const todo1 = {
        id: '1',
        user: '1',
        title: 'some title',
        description: 'some description',
        completed: true
      };
      const todo2 = { ...todo1, id: '2', title: 'anotherTodo' };

      const state: TodosEntityState = {
        ids: [todo1.id, todo2.id],
        entities: {
          [todo1.id]: todo1,
          [todo2.id]: todo2
        },
        selectedTodoId: null,
        statusFilter: TodoFilterStatus.InCompleted,
        searchFilter: null
      };

      const todoToDelete = {
        id: '2'
      } as Todo;

      const action = TodoActions.deleteTodoSuccess(todoToDelete);
      const result = todosReducer(state, action);
      expect(result).toMatchSnapshot();
    });
  });
});
