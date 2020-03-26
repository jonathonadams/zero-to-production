export * from './lib/models';
export {
  isPasswordAllowed,
  generateAuthGuardConfig,
  generateAuthModuleConfig,
  createPublicPemFromPrivate,
} from './lib/auth-utils';
export {
  AuthModuleConfig,
  IRefreshTokenModel,
  IRefreshTokenDocument,
  IVerificationToken,
  IVerificationTokenDocument,
  IVerificationTokenModel,
  AuthEnvironnementConfig,
  JWKSGuarConfig,
  GuardConfig,
  JWKSRouteConfig,
} from './lib/auth.interface';
export { getRestGuards } from './lib/routes/route.guards';
export { applyAuthRoutes } from './lib/routes/auth.routes';

export * from './lib/graphql';

/**
 * UQT_UPDATE -> Delete from this line onwards after cloning the repo
 *
 * For further details, see
 * https://github.com/unquenchablethyrst/zero-to-production/tree/master/libs/server/auth/README.md
 */
export * from './lib/demo/index';
