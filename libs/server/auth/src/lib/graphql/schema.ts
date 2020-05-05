import { makeExecutableSchema, IResolvers } from 'apollo-server-koa';
import { authTypeDef } from './auth.types';

export function createAuthSchema(resolvers: IResolvers) {
  return makeExecutableSchema({
    typeDefs: authTypeDef,
    resolvers,
    allowUndefinedInResolve: false,
  });
}
