import {
  getGraphQLGuards,
  getRestGuards,
  createAuthDirectives,
  VerifyJWKS,
} from '@ztp/server/auth';
import { config, authConfig } from '../../environments';
import { User } from '../api/users';

const guard: VerifyJWKS = {
  issuer: authConfig.accessToken.issuer,
  audience: authConfig.accessToken.audience,
  authServerHost: authConfig.authServerHost,
  allowHttp: config.production,
};

const guardConfig = {
  authenticate: guard,
  activeUser: { User },
};

/**
 * Guards for use in Routes
 */
export const {
  authenticate: routeAuthGuard,
  verifyIsActive: routeIsActiveGuard,
} = getRestGuards(guardConfig);

/**
 * Guards to user with GraphQL Resolvers
 */
export const {
  authenticate: resolverAuthGuard,
  verifyIsActive: resolverIsActiveGuard,
} = getGraphQLGuards(guardConfig);

export const authDirectives = createAuthDirectives(guardConfig);
