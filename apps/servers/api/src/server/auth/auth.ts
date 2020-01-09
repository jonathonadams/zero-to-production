import {
  applyAuthorizationRoutes,
  getAuthResolvers,
  getGraphQlGuards,
  getRestGuards,
  applyAuthRoutesWithRefreshTokens
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
} = getRestGuards(User, config.auth.accessTokenPublicKey);

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyUserIsActive: verifyUserIsActiveGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = getGraphQlGuards(User, config.auth.accessTokenPublicKey);

/**
 * Auth Resolvers
 */
export const { authResolvers } = getAuthResolvers(User, VerificationToken)(
  config.auth.accessTokenPublicKey,
  config.auth.accessTokenExpireTime,
  config.auth.sendGridApiKey,
  config.hostUrl
);

export const applyAuthRoutes = applyAuthRoutesWithRefreshTokens({
  User,
  VerificationToken,
  RefreshToken,
  accessTokenPrivateKey: config.auth.accessTokenPrivateKey,
  accessTokenExpireTime: config.auth.accessTokenExpireTime,
  refreshTokenPrivateKey: config.auth.refreshTokenPrivateKey,
  sendGridApiKey: config.auth.sendGridApiKey,
  hostUrl: config.hostUrl
});

// applyAuthorizationRoutes({
//   userLogin: true,
//   userRegistration: true,
//   refreshTokens: true
// })({
//   userModel: User,
//   verificationModel: VerificationToken,
//   refreshTokenModel: RefreshToken
// })({
//   accessTokenPrivateKey: config.auth.accessTokenPrivateKey,
//   accessTokenExpireTime: config.auth.accessTokenExpireTime,
//   refreshTokenPrivateKey: config.auth.refreshTokenPrivateKey,
//   sendGridApiKey: config.auth.sendGridApiKey,
//   hostUrl: config.hostUrl
// });
