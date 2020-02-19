import { IUserDocument } from '@uqt/server/core-data';
import { generateResolvers } from '@uqt/server/utils';
import { TResolverAuthGuard } from '../interface';
import { IUserModel } from './user';

export const createUsersResolver = (
  User: IUserModel,
  guard: TResolverAuthGuard
) => {
  const resolvers = generateResolvers<IUserDocument>(User);
  return {
    Query: {
      User: guard(resolvers.getOne),
      allUsers: guard(resolvers.getAll)
    },
    Mutation: {
      updateUser: guard(resolvers.updateOne),
      removeUser: guard(resolvers.removeOne)
    }
  };
};
