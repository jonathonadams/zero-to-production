import Router from '@koa/router';
import { generateRestControllers } from '@uqt/server/utils';
import { IUserModel, IUserDocument } from './user';

export const createUsersRouter = (User: IUserModel) => {
  const controllers = generateRestControllers<IUserDocument>(User, false);

  const usersRouter = new Router();

  usersRouter.param('id', controllers.params);

  usersRouter.get('/', controllers.getAll);

  usersRouter
    .get('/:id', controllers.getOne)
    .put('/:id', controllers.updateOne)
    .delete('/:id', controllers.removeOne);

  return usersRouter;
};
