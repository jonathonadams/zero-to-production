import Koa from 'koa';
import jwksClient from 'jwks-rsa';
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

/**
 * Guards for use in Routes
 */
export const {
  verifyToken: verifyTokenRest,
  verifyUserIsActive: verifyUserIsActiveRest
} = getRestGuards(
  User,
  config.auth.accessTokenPublicKey,
  config.auth.accessTokenIssuer
);

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyUserIsActive: verifyUserIsActiveGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = getGraphQlGuards(
  User,
  config.auth.accessTokenPublicKey,
  config.auth.accessTokenIssuer
);

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

const client = jwksClient({
  strictSsl: false, // Default value
  jwksUri: 'http://localhost:3000/.well-known/jwks.json',
  requestHeaders: {} // Optional
});

setTimeout(() => {
  const kid = 'key';
  client.getSigningKey(kid, (err, key) => {
    console.log(err);
    console.log(key);
    // const signingKey = key.publicKey || key.rsaPublicKey;
    // Now I can use this to configure my Express or Hapi middleware
  });
}, 10000);
