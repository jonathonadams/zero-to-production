/* istanbul ignore file */
import Koa from 'koa';
import { Connection } from 'mongoose';
import {
  createResolvers,
  createApollo,
  createTypeDefs,
  createSchema
} from '@uqt/server/graphql';
import { authTypeDef } from '@uqt/server/auth';
import { todoTypeDef, userTypeDef } from '@uqt/server/core-data';
import { config } from '../../environments/environment';
import { usersResolvers } from './users';
import { todosResolvers } from './todos';
import { createGraphQLGuards } from '../auth/auth.guards';
import { authResolvers } from '../auth/demo.auth';

// A function that applies the middleware to the app.
export function applyGraphQLEndpoint(app: Koa, conn: Connection) {
  const { verifyToken, verifyActiveUser } = createGraphQLGuards(conn);

  const typeDefs = createTypeDefs(authTypeDef, userTypeDef, todoTypeDef);
  const resolvers = createResolvers(
    authResolvers(app, conn),
    usersResolvers(conn, verifyToken),
    todosResolvers(conn, verifyToken)
  );

  // const loaders = createLoaders({ users: User, todos: Todo });
  const schema = createSchema({
    typeDefs,
    resolvers
  });

  const apolloServer = createApollo({
    schema,
    production: config.production
  });

  apolloServer.applyMiddleware({ app });
}
