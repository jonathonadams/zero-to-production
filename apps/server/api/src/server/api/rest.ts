import Koa from 'koa';
import Router from '@koa/router';
import { usersRouter } from './users';
import { Todo } from '@uqt/server/core-data';
import { verifyTokenRest } from '../auth/auth.guards';
import { ITodoDocument } from '@uqt/server/core-data';
import { generateRestEndpoints } from '@uqt/server/utils';

export function applyRestEndpoints(app: Koa) {
  const router = new Router({
    prefix: '/api'
  });

  // Global check to ensure token is valid
  router.use(verifyTokenRest);

  // Apply all your routes here
  router.use('/users', usersRouter.routes());
  router.use(
    '/todos',
    generateRestEndpoints<ITodoDocument>({
      model: Todo,
      userResourcesOnly: true
    })
  );

  app.use(router.routes());
}
