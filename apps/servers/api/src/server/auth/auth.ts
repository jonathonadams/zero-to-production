import Koa from 'koa';
import {
  getAuthResolvers,
  getGraphQlGuards,
  getRestGuards,
  applyAuthRoutesWithRefreshTokens,
  createPublicJsonWebKeySetRouteFromPrivateKey,
  AuthModuleConfig
} from '@uqt/api/auth';
import { RefreshToken } from './tokens.model';
import config from '../../environments';
import { User, VerificationToken } from '../api/users';

const guardConfig = {
  User,
  production: config.production,
  authServerUrl: config.auth.authServerUrl,
  issuer: config.auth.accessToken.issuer,
  audience: config.auth.accessToken.audience
};

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
 * Guards for use in Routes
 */
export const {
  verifyToken: verifyTokenRest,
  verifyActiveUser: verifyActiveUserRest
} = getRestGuards(guardConfig);

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyActiveUser: verifyActiveUserGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = getGraphQlGuards(guardConfig);

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
