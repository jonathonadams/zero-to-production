import Koa from 'koa';
import { Connection } from 'mongoose';
import { getUserModel } from '@uqt/server/core-data';
import {
  getAuthResolvers,
  getVerificationTokenModel,
  getRefreshTokenModel,
  generateAuthModuleConfig,
  applyAuthRoutes
} from '@uqt/server/auth';
import { authConfig } from '../../environments/environment';

/**
 * Applies all required auth routes
 */
export function applyLambdaAuthRoutes(app: Koa, conn: Connection) {
  const User = getUserModel(conn);
  const VerificationToken = getVerificationTokenModel(conn);
  const RefreshToken = getRefreshTokenModel(conn);
  const config = generateAuthModuleConfig(
    User,
    VerificationToken,
    RefreshToken,
    authConfig
  );

  app.use(applyAuthRoutes(config));
}

/**
 * Auth Resolvers
 */
export function authResolvers(conn: Connection) {
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
