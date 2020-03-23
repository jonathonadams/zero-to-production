import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { authTypeDef } from '../graphql/auth.types';

export function createDemoAuthSchema(resolvers: IResolvers) {
  return makeExecutableSchema({
    typeDefs: authTypeDef,
    resolvers,
    allowUndefinedInResolve: false
  });
}
