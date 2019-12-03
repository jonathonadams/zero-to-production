import { IUserDocument } from '@uqt/types';
import { generateResolvers } from '@uqt/api/utils';
import { AuthenticationRoles } from '@uqt/enums';
import { User } from './user.model';
import { verifyTokenGraphQL, verifyUserRoleGraphQL } from '../../auth/auth';

const resolvers = generateResolvers<IUserDocument>(User);

export const userResolvers = {
  Query: {
    User: verifyTokenGraphQL(resolvers.getOne),
    allUsers: verifyTokenGraphQL(resolvers.getAll)
  },
  Mutation: {
    updateUser: verifyTokenGraphQL(resolvers.updateOne),
    removeUser: verifyTokenGraphQL(resolvers.removeOne)
  }
};
