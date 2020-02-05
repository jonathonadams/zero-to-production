import Koa from 'koa';
import { User } from '@uqt/server/core-data';
import {
  getAuthResolvers,
  applyAuthRoutesWithRefreshTokens,
  createPublicJsonWebKeySetRouteFromPrivateKey,
  AuthModuleConfig,
  RefreshToken,
  VerificationToken
} from '@uqt/server/auth';
import config from '../../environments';

const authModuleConfig: AuthModuleConfig = {
  login: { User, ...config.auth.accessToken },
  register: { User, VerificationToken, ...config.auth.accessToken },
  verify: { User, VerificationToken, ...config.auth.accessToken },
  authorize: {
    User,
    RefreshToken,
    ...config.auth.accessToken,
    ...config.auth.refreshToken
  },
  refresh: {
    RefreshToken,
    ...config.auth.accessToken,
    ...config.auth.refreshToken
  },
  revoke: {
    RefreshToken
  },
  email: config.auth.email
};

const jwksRouteConfig = {
  privateKey: config.auth.accessToken.privateKey,
  keyId: config.auth.accessToken.keyId
};

/**
 * Applies all required auth routes
 */
export function applyAuthRoutes(app: Koa) {
  applyAuthRoutesWithRefreshTokens(authModuleConfig)(app);
  // JWKS route
  createPublicJsonWebKeySetRouteFromPrivateKey(jwksRouteConfig)(app);
}

/**
 * Auth Resolvers
 */
export const { authResolvers } = getAuthResolvers(authModuleConfig);
