/* istanbul ignore file */
import {
  ApolloServer,
  makeExecutableSchema,
  IResolvers,
  ITypeDefinitions,
  SchemaDirectiveVisitor,
  mergeSchemas,
} from 'apollo-server-koa';
import { ILoaders } from './data-loader';
import { GraphQLSchema } from 'graphql';
import { FormatDateDirective } from './directives';

export function createSchema({
  typeDefs,
  resolvers,
  directives,
}: {
  typeDefs: ITypeDefinitions;
  resolvers: IResolvers[];
  directives?: {
    [name: string]: typeof SchemaDirectiveVisitor;
  };
}): GraphQLSchema {
  const defaultDirectives = {
    // log: LogDirective,
    formatDate: FormatDateDirective,
  };

  return makeExecutableSchema({
    typeDefs,
    resolvers,
    allowUndefinedInResolve: false,
    schemaDirectives: directives
      ? { ...defaultDirectives, ...directives }
      : defaultDirectives,
  });
}

export function createApollo({
  schemas,
  production,
  loaders,
}: {
  schemas: GraphQLSchema[];
  production: boolean;
  loaders?: () => ILoaders;
}) {
  const schema = mergeSchemas({ schemas });
  return new ApolloServer({
    schema,
    context: async ({ ctx, connection }) => {
      // if the connection exists, it is a subscription
      if (connection) {
        return {
          // create an empty state object to store temporary data in the resolvers
          state: {},
          // Add any necessary data loaders here if wanted
          loaders: loaders ? loaders() : undefined,
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
          token: ctx.request.token,
        };
      }
    },
    playground: !production,
    tracing: !production,
    debug: !production,
    uploads: false,
  });
}
