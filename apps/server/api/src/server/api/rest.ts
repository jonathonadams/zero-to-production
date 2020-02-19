import Koa from 'koa';
import Router from '@koa/router';
import { usersRouter } from './users';
import { verifyTokenRest } from '../auth/auth.guards';
import { todosRouter } from './todos';

export function applyRestEndpoints(app: Koa) {
  const router = new Router({
    prefix: '/api'
  });

  // Global check to ensure token is valid
  router.use(verifyTokenRest);

  // Apply all your routes here
  router.use('/users', usersRouter.routes());
  router.use('/todos', todosRouter.routes());

  app.use(router.routes());
}
