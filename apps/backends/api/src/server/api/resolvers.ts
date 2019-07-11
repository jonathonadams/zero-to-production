import merge from 'lodash.merge';
import { createTypeResolver } from '../../../../../../libs/backend/utils/src/lib/resolvers/create-resolvers';
import { userResolvers } from './users/index';
import { Todo } from './todos/index';
import { ITodoDocument } from './todos/todo.model';

// All the resolvers as an object.
const resolvers = merge(
  {},
  userResolvers,
  createTypeResolver<ITodoDocument>(Todo, 'Todo')
);

export default resolvers;
