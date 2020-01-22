import merge from 'lodash.merge';
import { createTypeResolver } from '@uqt/api/utils';
import { ITodoDocument } from '@uqt/api/core-data';
import { userResolvers } from './users/index';
import { Todo } from './todos/index';
// UQT_DEMO
// import { verifyTokenGraphQL, authResolvers } from '../auth/auth';
import { verifyTokenGraphQL } from '../auth/auth';
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
