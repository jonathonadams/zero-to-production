import { createTypeResolver } from '@uqt/server/utils';
import { TResolverAuthGuard } from '../interface';
import { ITodoModel, ITodoDocument } from './todo';

export const createTodosResolver = (
  Todo: ITodoModel,
  guard: TResolverAuthGuard
) => {
  return createTypeResolver<ITodoDocument>({
    model: Todo,
    name: 'Todo',
    resolverAuthentication: guard,
    userResourcesOnly: true
  });
};
