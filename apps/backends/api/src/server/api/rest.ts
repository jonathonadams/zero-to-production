import Koa from 'koa';
import Router from 'koa-router';
import { usersRouter } from './users';
import { Todo } from './todos';
import { verifyToken } from '../auth/authGuardRest';
import { ITodoDocument } from '@workspace/shared/interfaces';
import { generateRestEndpoints } from '@workspace/backend/utils';

export function applyRestEndpoints(app: Koa) {
  const router = new Router({
    prefix: '/api'
  });

  // Global check to ensure token is valid
  router.use(verifyToken);

  // Apply all your routes here
  router.use('/users', usersRouter.routes());
  router.use('/todos', generateRestEndpoints<ITodoDocument>(Todo));

  app.use(router.routes());
}
