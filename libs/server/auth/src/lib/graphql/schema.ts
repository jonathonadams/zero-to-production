import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { authTypeDef } from './auth.types';

export function createAuthSchema(resolvers: IResolvers) {
  return makeExecutableSchema({
    typeDefs: authTypeDef,
    resolvers,
    allowUndefinedInResolve: false,
  });
}
