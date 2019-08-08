import { IUserDocument } from '@ngw/shared/interfaces';
import { generateResolvers } from '@ngw/backend/utils';
import { AuthenticationRoles } from '@ngw/shared/enums';
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
