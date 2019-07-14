import merge from 'lodash.merge';
import { createTypeResolver } from '@workspace/backend/utils';
import { ITodoDocument } from '@workspace/shared/interfaces';
import { userResolvers } from './users/index';
import { Todo } from './todos/index';

// All the resolvers as an object.
const resolvers = merge(
  {},
  userResolvers,
  createTypeResolver<ITodoDocument>(Todo, 'Todo')
);

export default resolvers;
