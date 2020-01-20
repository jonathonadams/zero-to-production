import { Todo } from './todo.model';
import { newId } from '@app-testing/api/helpers';
import { createGraphQLSpec } from '@app-testing/api/graphQLSpec';
import { schema } from '../graphql';
import { ITodo } from '@uqt/interfaces';

const todo = {
  title: 'Some Todo',
  description: 'A todo that needs to be done',
  userId: newId()
} as ITodo;

const updatedTodo = {
  completed: true
};

createGraphQLSpec(schema)(Todo, 'Todo', todo, updatedTodo);
