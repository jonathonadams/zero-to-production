import { AuthModule, AuthConfig } from '@workspace/backend/auth';
import { RefreshToken } from './tokens.model';
import config from '../config';
import { User } from '../api/users';

const authConfig: AuthConfig = {
  userModel: User,
  accessTokenSecret: config.secrets.accessToken,
  accessTokenExpireTime: config.expireTime,
  refreshTokenSecret: config.secrets.refreshToken,
  refreshTokenModel: RefreshToken
};

const auth = new AuthModule(authConfig);

export const {
  verifyToken: verifyTokenRest,
  verifyUserIsActive: verifyUserIsActiveRest
} = auth.restGuards;

export const {
  verifyToken: verifyTokenGraphQL,
  verifyUserIsActive: verifyUserIsActiveGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = auth.graphQlGuards;

export default auth;
