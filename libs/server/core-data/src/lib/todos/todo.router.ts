import { generateRestRouter } from '@uqt/server/utils';
import { ITodoModel, ITodoDocument } from './todo';

export const createTodosRouter = (Todo: ITodoModel) => {
  return generateRestRouter<ITodoDocument>({
    model: Todo,
    userResourcesOnly: true
  });
};
