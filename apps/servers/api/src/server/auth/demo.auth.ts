import Koa from 'koa';
import { User } from '@uqt/api/core-data';
import {
  createPublicJsonWebKeySetRouteFromPrivateKey,
  applyDemoAuthRoutesWithRefreshTokens,
  DemoAuthModuleConfig,
  getDemoAuthResolvers
} from '@uqt/api/auth';
import config from '../../environments';

const authModuleConfig: DemoAuthModuleConfig = {
  login: { User, ...config.auth.accessToken },
  register: { User, ...config.auth.accessToken }
};

const jwksRouteConfig = {
  privateKey: config.auth.accessToken.privateKey,
  keyId: config.auth.accessToken.keyId
};

/**
 * Applies all required auth routes
 */
export function applyAuthRoutes(app: Koa) {
  applyDemoAuthRoutesWithRefreshTokens(authModuleConfig)(app);
  // JWKS route
  createPublicJsonWebKeySetRouteFromPrivateKey(jwksRouteConfig)(app);
}

/**
 * Auth Resolvers
 */
export const { authResolvers } = getDemoAuthResolvers(authModuleConfig);
