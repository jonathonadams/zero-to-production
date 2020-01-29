import Koa from 'koa';
import { User } from '@uqt/backend/core-data';
import {
  createPublicJsonWebKeySetRouteFromPrivateKey,
  applyDemoAuthRoutes,
  DemoAuthModuleConfig,
  getDemoAuthResolvers
} from '@uqt/backend/auth';
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
  applyDemoAuthRoutes(authModuleConfig)(app);
  // JWKS route
  createPublicJsonWebKeySetRouteFromPrivateKey(jwksRouteConfig)(app);
}

/**
 * Auth Resolvers
 */
export const { authResolvers } = getDemoAuthResolvers(authModuleConfig);
