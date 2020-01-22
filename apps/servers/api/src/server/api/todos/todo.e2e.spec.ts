import Koa from 'koa';
import { Todo } from './todo.model';
import { newId } from '@app-testing/api/helpers';
import { ITodo } from '@uqt/interfaces';
import { createGraphQLSpec } from '@app-testing/api/graphQLSpec';
import config from '../../../environments/index';
import { schema } from '../graphql';
import ApiServer from '../../server';

// Need to import and run the server because
// the server is also our "auth server"
// and the Auth guard needs to be able to retrieve the JWKS
const server = new ApiServer(new Koa());

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

createGraphQLSpec(schema, tokenConfig, server)(Todo, 'Todo', todo, updatedTodo);
