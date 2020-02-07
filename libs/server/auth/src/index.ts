export { RefreshToken, VerificationToken } from './lib/models';
export { isPasswordAllowed } from './lib/auth-utils';
export {
  AuthModuleConfig,
  IRefreshTokenModel,
  IRefreshTokenDocument,
  IVerificationToken,
  IVerificationTokenDocument,
  IVerificationTokenModel
} from './lib/auth.interface';
export { getRestGuards } from './lib/routes/route.guards';
export { getGraphQlGuards } from './lib/graphql/graphql.guards';
export { getAuthResolvers } from './lib/graphql/auth.resolvers';
export { applyAuthRoutesWithRefreshTokens } from './lib/routes/auth.routes';
export { authTypeDef } from './lib/graphql/auth.types';
export { createPublicJsonWebKeySetRouteFromPrivateKey } from './lib/routes/jwks';

/**
 * UQT_UPDATE -> Delete from this line onwards after cloning the repo
 *
 * For further details, see
 * https://github.com/unquenchablethyrst/zero-to-production/tree/master/libs/server/auth/README.md
 */
export {
  DemoAuthModuleConfig,
  applyDemoAuthRoutes,
  getDemoAuthResolvers
} from './lib/demo/index';
