import Koa from 'koa';
import Router from 'koa-router';
import { usersRouter } from './users';
import { Todo } from './todos';
import { verifyTokenRest } from '../auth/auth';
import { ITodoDocument } from '@uqt/api/core-data';
import { generateRestEndpoints } from '@uqt/api/utils';
import { usernameAvailable } from './users/user.controllers';

export function applyRestEndpoints(app: Koa) {
  const router = new Router({
    prefix: '/api'
  });

  // This route needs to sit outside of the verify token route
  // TODO  -> Move this to the auth module;
  router.get('/users/available', usernameAvailable);

  // Global check to ensure token is valid
  router.use(verifyTokenRest);

  // Apply all your routes here
  router.use('/users', usersRouter.routes());
  router.use('/todos', generateRestEndpoints<ITodoDocument>(Todo));

  app.use(router.routes());
}
