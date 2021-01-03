import { makeExecutableSchema } from 'apollo-server-koa';
import { AuthModuleConfig } from '../types';
import { getAuthResolvers } from './resolvers';
import { authTypeDef } from './type-def';

export function createAuthSchema(config: AuthModuleConfig) {
  const resolvers = getAuthResolvers(config);

  return makeExecutableSchema({
    typeDefs: authTypeDef,
    resolvers,
    allowUndefinedInResolve: false,
  });
}
