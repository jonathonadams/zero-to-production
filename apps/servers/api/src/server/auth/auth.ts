import Koa from 'koa';
import {
  getAuthResolvers,
  getGraphQlGuards,
  getRestGuards,
  applyAuthRoutesWithRefreshTokens,
  createPublicJsonWebKeySetRouteFromPrivateKey
} from '@uqt/api/auth';
import { RefreshToken } from './tokens.model';
import config from '../../environments';
import { User, VerificationToken } from '../api/users';

const guardConfig = {
  User,
  production: config.production,
  authServerUrl: config.hostUrl,
  issuer: config.auth.accessTokenIssuer
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

// TODO
//Access Token ENV
const authConfig = {
  User,
  VerificationToken,
  RefreshToken,
  accessTokenPrivateKey: config.auth.accessTokenPrivateKey,
  accessTokenExpireTime: config.auth.accessTokenExpireTime,
  accessTokenIssuer: config.auth.accessTokenIssuer,
  refreshTokenPrivateKey: config.auth.refreshTokenPrivateKey,
  refreshTokenPublicKey: config.auth.refreshTokenPublicKey,
  sendGridApiKey: config.auth.sendGridApiKey,
  hostUrl: config.hostUrl
};

/**
 * Auth Resolvers
 */
export const { authResolvers } = getAuthResolvers(authConfig);

// TODO -> Key ID

/**
 * Applies all required auth routes
 */
export function applyAuthRoutes(app: Koa) {
  applyAuthRoutesWithRefreshTokens(authConfig)(app);
  // JWKS route
  createPublicJsonWebKeySetRouteFromPrivateKey(
    config.auth.accessTokenPrivateKey,
    'key',
    app
  );
}
