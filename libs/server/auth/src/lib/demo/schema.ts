import { makeExecutableSchema, IResolvers } from 'apollo-server-koa';
import { authTypeDef } from '../graphql/auth.types';

export function createDemoAuthSchema(resolvers: IResolvers) {
  return makeExecutableSchema({
    typeDefs: authTypeDef,
    resolvers,
    allowUndefinedInResolve: false,
  });
}
