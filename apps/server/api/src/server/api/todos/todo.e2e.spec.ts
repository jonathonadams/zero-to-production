import Koa from 'koa';
import { ITodo } from '@uqt/data';
import { authConfig } from '../../../environments/index';
import { schema } from '../../graphql';
import ApiServer from '../../server';
import { createGraphQLSpec } from '@uqt/tests/server';
import { Todo } from './todo.model';
import { User } from '../users';

// Need to import and run the server because
// the server is also our "auth server"
// and the Auth guard needs to be able to retrieve the JWKS
const server = new ApiServer(new Koa());

const todo = {
  title: 'Some Todo',
  description: 'A todo that needs to be done',
} as ITodo;

const updatedTodo = {
  completed: true,
};

createGraphQLSpec(
  schema,
  authConfig.accessToken,
  server,
  /*userResource */ true
)(Todo, 'Todo', todo, updatedTodo, User);
