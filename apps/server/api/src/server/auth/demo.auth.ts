// UQT_UPDATE -> delete this file

import Koa from 'koa';
import {
  createPublicJsonWebKeySetRouteFromPrivateKey,
  applyDemoAuthRoutes,
  getDemoAuthResolvers,
  JWKSRouteConfig,
  generateDemoAuthModuleConfig,
  createPublicPemFromPrivate
} from '@uqt/server/auth';
import { authConfig } from '../../environments';
import { User } from '../api/users';

const authModuleConfig = generateDemoAuthModuleConfig(User, authConfig);

const publicKey = authConfig.accessToken.publicKey;
const jwksRouteConfig: JWKSRouteConfig = {
  publicKey: publicKey
    ? publicKey
    : createPublicPemFromPrivate(authConfig.accessToken.privateKey),
  keyId: authConfig.accessToken.keyId
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
export const authResolvers = getDemoAuthResolvers(authModuleConfig);
