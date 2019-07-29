import { AuthModule, AuthConfig } from '@ngw/backend/auth';
import { RefreshToken } from './tokens.model';
import config from '../../environments';
import { User } from '../api/users';

const authConfig: AuthConfig = {
  userModel: User,
  accessTokenSecret: config.secrets.accessToken,
  accessTokenExpireTime: config.expireTime,
  refreshTokenSecret: config.secrets.refreshToken,
  refreshTokenModel: RefreshToken
};

const auth = new AuthModule(authConfig);

/**
 * Auth Resolvers
 */
export const { authResolvers } = auth.authResolvers;

/**
 * Guards for use in Routes
 */
export const {
  verifyToken: verifyTokenRest,
  verifyUserIsActive: verifyUserIsActiveRest
} = auth.restGuards;

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyUserIsActive: verifyUserIsActiveGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = auth.graphQlGuards;

export default auth;
