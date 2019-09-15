import {
  applyAuthorizationRoutes,
  getAuthResolvers,
  getGraphQlGuards,
  getRestGuards
} from '@ngw/api/auth';
import { RefreshToken } from './tokens.model';
import config from '../../environments';
import { User, VerificationToken } from '../api/users';

/**
 * Guards for use in Routes
 */
export const {
  verifyToken: verifyTokenRest,
  verifyUserIsActive: verifyUserIsActiveRest
} = getRestGuards(User, config.secrets.accessToken);

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyUserIsActive: verifyUserIsActiveGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = getGraphQlGuards(User, config.secrets.accessToken);

/**
 * Auth Resolvers
 */
export const { authResolvers } = getAuthResolvers(User, VerificationToken)(
  config.secrets.accessToken,
  config.expireTime,
  config.apiKeys.sendGrid,
  config.hostUrl
);

export const applyAuthRoutes = applyAuthorizationRoutes({
  userLogin: true,
  userRegistration: true,
  refreshTokens: true
})({
  userModel: User,
  verificationModel: VerificationToken,
  refreshTokenModel: RefreshToken
})({
  accessTokenSecret: config.secrets.accessToken,
  accessTokenExpireTime: config.expireTime,
  refreshTokenSecret: config.secrets.refreshToken,
  SENDGRID_API_KEY: config.apiKeys.sendGrid,
  hostUrl: config.hostUrl
});
