import Router from '@koa/router';
import * as controllers from './user.controllers';

export const usersRouter = new Router();

usersRouter.param('id', controllers.params);

usersRouter.get('/', controllers.getAll).post('/', controllers.createOne);

usersRouter
  .get('/:id', controllers.getOne)
  .put('/:id', controllers.updateOne)
  .delete('/:id', controllers.removeOne);
