import Koa from 'koa';
import { User } from '../api/users';
import {
  getAuthResolvers,
  applyAuthRoutesWithRefreshTokens,
  createPublicJsonWebKeySetRouteFromPrivateKey,
  JWKSRouteConfig,
  generateAuthModuleConfig,
  createPublicPemFromPrivate
} from '@uqt/server/auth';
import { authConfig } from '../../environments';
import { VerificationToken, RefreshToken } from './models';

const authModuleConfig = generateAuthModuleConfig(
  User,
  VerificationToken,
  RefreshToken,
  authConfig
);

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
  applyAuthRoutesWithRefreshTokens(authModuleConfig)(app);
  // JWKS route
  createPublicJsonWebKeySetRouteFromPrivateKey(jwksRouteConfig)(app);
}

/**
 * Auth Resolvers
 */
export const authResolvers = getAuthResolvers(authModuleConfig);
