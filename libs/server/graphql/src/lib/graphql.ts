/* istanbul ignore file */
import {
  ApolloServer,
  makeExecutableSchema,
  IResolvers,
  ITypeDefinitions
} from 'apollo-server-koa';
import { ILoaders } from './data-loader';
import { GraphQLSchema } from 'graphql';

export function createSchema({
  typeDefs,
  resolvers
}: {
  typeDefs: ITypeDefinitions;
  resolvers: IResolvers[];
}): GraphQLSchema {
  return makeExecutableSchema({
    typeDefs,
    resolvers,
    allowUndefinedInResolve: false
  });
}

export function createApollo({
  schema,
  production,
  loaders
}: {
  schema: GraphQLSchema;
  production: boolean;
  loaders?: () => ILoaders;
}) {
  const apolloServer = new ApolloServer({
    schema: schema,
    context: async ({ ctx, connection }) => {
      // if the connection exists, it is a subscription
      if (connection) {
        return {
          // create an empty state object to store temporary data in the resolvers
          state: {},
          // Add any necessary data loaders here if wanted
          loaders: loaders ? loaders() : undefined
        };
      }
      // if the ctx exists, it is a req/res
      if (ctx) {
        return {
          // create an empty state object to store temporary data in the resolvers
          state: {},
          // Add any necessary data loaders here if wanted
          loaders: loaders ? loaders() : undefined,
          // Add the JWT as the token property
          token: ctx.request.token
        };
      }
    },
    playground: !production,
    tracing: !production,
    debug: !production,
    uploads: false
  });

  return apolloServer;
}

// // A function that applies the middleware to the app.
// export function applyGraphQLEndpoints(app: Koa) {
//   apolloServer.applyMiddleware({ app });
// }
