import Koa from 'koa';
import { AuthModule } from '@ngw/backend/auth';
import { RefreshToken } from './tokens.model';
import config from '../../environments';
import { User, VerificationToken } from '../api/users';

/**
 * Guards for use in Routes
 */
export const {
  verifyToken: verifyTokenRest,
  verifyUserIsActive: verifyUserIsActiveRest
} = AuthModule.getRestGuards(User, config.secrets.accessToken);

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyUserIsActive: verifyUserIsActiveGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = AuthModule.getGraphQlGuards(User, config.secrets.accessToken);

/**
 * Auth Resolvers
 */
export const { authResolvers } = AuthModule.getAuthResolvers(
  User,
  VerificationToken
)(
  config.secrets.accessToken,
  config.expireTime,
  config.apiKeys.sendGrid,
  config.hostUrl
);

export function applyAuthorizationRoutes(app: Koa) {
  AuthModule.applyAuthorizationRoutes(User, VerificationToken, RefreshToken)(
    config.secrets.accessToken,
    config.expireTime,
    config.secrets.refreshToken,
    config.apiKeys.sendGrid,
    config.hostUrl
  )(app);
}
