import { loginResolver, registerResolver } from '@workspace/backend/auth';
import { IUserDocument } from '@workspace/shared/interfaces';
import { generateResolvers } from '@workspace/backend/utils';
import { AuthenticationRoles } from '@workspace/shared/enums';
import { User } from './user.model';
import { verifyTokenGraphQL, verifyUserRoleGraphQL } from '../../auth/auth';
import config from '../../../environments';

const resolvers = generateResolvers<IUserDocument>(User);

export const userResolvers = {
  Query: {
    User: verifyTokenGraphQL(resolvers.getOne),
    allUsers: verifyTokenGraphQL(resolvers.getAll)
  },
  Mutation: {
    login: loginResolver({
      userModel: User,
      secret: config.secrets.accessToken,
      expireTime: config.expireTime
    }),
    register: verifyTokenGraphQL(registerResolver(User)),
    updateUser: verifyTokenGraphQL(resolvers.updateOne),
    removeUser: verifyUserRoleGraphQL(AuthenticationRoles.Admin)(
      resolvers.removeOne
    )
  }
};
