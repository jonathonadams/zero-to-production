import { IUserDocument } from '@workspace/shared/interfaces';
import { generateResolvers } from '@workspace/backend/utils';
import { User } from './user.model';
import { authenticateRequest, verifyToken } from '../../auth/authGuardGraphQL';

// import { login, register } from '../../auth/graphqlAuth';

const resolvers = generateResolvers<IUserDocument>(User);

export const userResolvers = {
  Query: {
    User: authenticateRequest(verifyToken)(resolvers.getOne),
    allUsers: authenticateRequest(verifyToken)(resolvers.getAll)
  },
  Mutation: {
    // login: login,
    // register: authenticateRequest(verifyToken)(register),
    updateUser: authenticateRequest(verifyToken)(resolvers.updateOne),
    removeUser: authenticateRequest(verifyToken)(resolvers.removeOne)
  }
};
