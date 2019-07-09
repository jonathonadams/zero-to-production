import { IUserDocument, User } from '@workspace/backend/resources';
// import { login, register } from '../../auth/graphqlAuth';
import { generateResolvers } from '../../util/create-resolvers';

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
