import Koa from 'koa';
import { Connection } from 'mongoose';
import { getUserModel } from '@uqt/server/core-data';
import {
  getAuthResolvers,
  applyAuthRoutesWithRefreshTokens,
  getVerificationTokenModel,
  getRefreshTokenModel,
  generateAuthModuleConfig
} from '@uqt/server/auth';
import { authConfig } from '../../environments/environment';

/**
 * Applies all required auth routes
 */
export function applyAuthRoutes(app: Koa, conn: Connection) {
  const User = getUserModel(conn);
  const VerificationToken = getVerificationTokenModel(conn);
  const RefreshToken = getRefreshTokenModel(conn);
  const config = generateAuthModuleConfig(
    User,
    VerificationToken,
    RefreshToken,
    authConfig
  );

  applyAuthRoutesWithRefreshTokens(config)(app);
}

/**
 * Auth Resolvers
 */
export function authResolvers(app: Koa, conn: Connection) {
  const User = getUserModel(conn);
  const VerificationToken = getVerificationTokenModel(conn);
  const RefreshToken = getRefreshTokenModel(conn);
  const config = generateAuthModuleConfig(
    User,
    VerificationToken,
    RefreshToken,
    authConfig
  );

  return getAuthResolvers(config);
}
