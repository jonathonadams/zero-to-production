import { IUserDocument } from '@ztp/server/core-data';
import { generateResolvers } from '@ztp/server/utils';
import { IUserModel } from './user';

export const createUsersResolver = (User: IUserModel) => {
  const resolvers = generateResolvers<IUserDocument>(User);
  return {
    Query: {
      User: resolvers.getOne,
      allUsers: resolvers.getAll,
    },
    Mutation: {
      updateUser: resolvers.updateOne,
      removeUser: resolvers.removeOne,
    },
  };
};
