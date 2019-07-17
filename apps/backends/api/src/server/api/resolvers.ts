import merge from 'lodash.merge';
import { createTypeResolver } from '@workspace/backend/utils';
import { ITodoDocument } from '@workspace/shared/interfaces';
import { userResolvers } from './users/index';
import { Todo } from './todos/index';
import { verifyTokenGraphQL } from '../auth/auth';

// All the resolvers as an object.
const resolvers = merge(
  {},
  userResolvers,
  createTypeResolver<ITodoDocument>({
    model: Todo,
    name: 'Todo',
    resolverAuthentication: verifyTokenGraphQL
  })
);

export default resolvers;
