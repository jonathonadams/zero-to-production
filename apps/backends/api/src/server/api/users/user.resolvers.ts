import { IUserDocument } from '@workspace/shared/interfaces';
import { generateResolvers } from '@workspace/backend/utils';
import { AuthenticationRoles } from '@workspace/shared/enums';
import { User } from './user.model';
import { verifyTokenGraphQL, verifyUserRoleGraphQL } from '../../auth/auth';

const resolvers = generateResolvers<IUserDocument>(User);

export const userResolvers = {
  Query: {
    User: verifyTokenGraphQL(resolvers.getOne),
    allUsers: verifyTokenGraphQL(resolvers.getAll)
  },
  Mutation: {
    // login: login,
    // register: authenticateRequest(verifyToken)(register),
    updateUser: verifyTokenGraphQL(resolvers.updateOne),
    removeUser: verifyUserRoleGraphQL(AuthenticationRoles.Admin)(
      resolvers.removeOne
    )
  }
};
