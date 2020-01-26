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

// UQT_UPDATE -> Delete this once cloning
export {
  DemoAuthModuleConfig,
  applyDemoAuthRoutesWithRefreshTokens,
  getDemoAuthResolvers
} from './lib/demo/index';
