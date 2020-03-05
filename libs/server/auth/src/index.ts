export * from './lib/models';
export {
  isPasswordAllowed,
  generateAuthGuardConfig,
  generateAuthModuleConfig,
  createPublicPemFromPrivate
} from './lib/auth-utils';
export {
  AuthModuleConfig,
  IRefreshTokenModel,
  IRefreshTokenDocument,
  IVerificationToken,
  IVerificationTokenDocument,
  IVerificationTokenModel,
  TResolverAuthGuard,
  AuthEnvironnementConfig,
  JWKSGuarConfig,
  GuardConfig,
  JWKSRouteConfig
} from './lib/auth.interface';
export { getRestGuards } from './lib/routes/route.guards';
export { getGraphQlGuards } from './lib/graphql/graphql.guards';
export { getAuthResolvers } from './lib/graphql/auth.resolvers';
export { applyAuthRoutes } from './lib/routes/auth.routes';
export { authTypeDef } from './lib/graphql/auth.types';

/**
 * UQT_UPDATE -> Delete from this line onwards after cloning the repo
 *
 * For further details, see
 * https://github.com/unquenchablethyrst/zero-to-production/tree/master/libs/server/auth/README.md
 */
export {
  DemoAuthModuleConfig,
  applyDemoAuthRoutes,
  getDemoAuthResolvers,
  generateDemoAuthModuleConfig
} from './lib/demo/index';
