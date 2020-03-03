/* istanbul ignore file */
import Koa from 'koa';
import {
  createResolvers,
  createApollo,
  createLoaders,
  createTypeDefs,
  createSchema
} from '@uqt/server/graphql';
import { config } from '../../environments';
import { userResolvers, User } from './users';
import { todosResolvers, Todo } from './todos';

import { authTypeDef } from '@uqt/server/auth';
import { todoTypeDef, userTypeDef } from '@uqt/server/core-data';
import { authResolvers } from '../auth/demo.auth';

const typeDefs = createTypeDefs(authTypeDef, userTypeDef, todoTypeDef);
const resolvers = createResolvers(authResolvers, userResolvers, todosResolvers);
const loaders = createLoaders({ users: User, todos: Todo });
export const schema = createSchema({
  typeDefs,
  resolvers
});

export const apolloServer = createApollo({
  schema,
  production: config.production,
  loaders
});
// A function that applies the middleware to the app.
export function applyGraphQLEndpoint(app: Koa) {
  apolloServer.applyMiddleware({ app });
}
