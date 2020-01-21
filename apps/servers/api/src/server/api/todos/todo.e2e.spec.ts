import { Todo } from './todo.model';
import { newId } from '@app-testing/api/helpers';
import { ITodo } from '@uqt/interfaces';
import { createGraphQLSpec } from '@app-testing/api/graphQLSpec';
import config from '../../../environments/index';
import { schema } from '../graphql';

const tokenConfig = {
  ...config.auth.accessToken
};

const todo = {
  title: 'Some Todo',
  description: 'A todo that needs to be done',
  userId: newId()
} as ITodo;

const updatedTodo = {
  completed: true
};

createGraphQLSpec(schema, tokenConfig)(Todo, 'Todo', todo, updatedTodo);
