/* istanbul ignore file */
import Koa from 'koa';
import {
  createResolvers,
  createApollo,
  createLoaders,
  createTypeDefs,
  createSchema
} from '@uqt/server/graphql';
import { authTypeDef } from '@uqt/server/auth';
import { todoTypeDef, userTypeDef } from '@uqt/server/core-data';
import { config } from '../environments';
// UQT_UPDATE -> delete the below import
import { authResolvers } from './auth/demo.auth';
// UQT_UPDATE -> uncomment the below import
// import { authResolvers } from './auth/auth'

import { userResolvers, todosResolvers, User, Todo } from './api';

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
