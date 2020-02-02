import merge from 'lodash.merge';
import { createTypeResolver } from '@uqt/backend/utils';
import { ITodoDocument } from '@uqt/backend/core-data';
import { userResolvers } from './users/index';
import { Todo } from '@uqt/backend/core-data';
// UQT_DEMO
// import { verifyTokenGraphQL, authResolvers } from '../auth/auth';
import { verifyTokenGraphQL } from '../auth/auth.guards';
import { authResolvers } from '../auth/demo.auth';

// All the resolvers as an object.
const resolvers = merge(
  {},
  authResolvers,
  userResolvers,
  createTypeResolver<ITodoDocument>({
    model: Todo,
    name: 'Todo',
    resolverAuthentication: verifyTokenGraphQL,
    userResourcesOnly: true
  })
);

export default resolvers;
