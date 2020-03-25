/* istanbul ignore file */
import Koa from 'koa';
import { Connection } from 'mongoose';
import {
  createResolvers,
  createApollo,
  createTypeDefs,
  createSchema,
} from '@uqt/server/graphql';
import { todoTypeDef, userTypeDef } from '@uqt/server/core-data';
import { config } from '../environments/environment';
import { authDirectives } from './auth/auth.guards';
import { usersResolvers, todosResolvers } from './api';

// UQT_UPDATE -> delete the 'demo' import and uncomment the 'auth' input
import { createAuthSchemaFromConnection } from './auth/demo.auth';
// import { createAuthSchemaFromConnection } from './auth/auth'

// A function that applies the middleware to the app.
export function applyGraphQLEndpoint(app: Koa, conn: Connection) {
  const typeDefs = createTypeDefs(userTypeDef, todoTypeDef);
  const resolvers = createResolvers(usersResolvers(conn), todosResolvers(conn));

  const schema = createSchema({
    typeDefs,
    resolvers,
    directives: authDirectives(conn),
  });

  const authSchema = createAuthSchemaFromConnection(conn);

  const apolloServer = createApollo({
    schemas: [schema, authSchema],
    production: config.production,
  });

  apolloServer.applyMiddleware({ app });
}
