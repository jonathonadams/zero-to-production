// UQT_UPDATE -> delete this file

import Koa from 'koa';
import { getUserModel } from '@uqt/server/core-data';
import {
  applyDemoAuthRoutes,
  generateDemoAuthModuleConfig,
  getDemoAuthResolvers
} from '@uqt/server/auth';
import { authConfig } from '../../environments/environment';
import { Connection } from 'mongoose';

/**
 * Applies all required auth routes
 */
export function applyAuthRoutes(app: Koa, conn: Connection) {
  const User = getUserModel(conn);
  const config = generateDemoAuthModuleConfig(User, authConfig);

  applyDemoAuthRoutes(config)(app);
}

/**
 * Auth Resolvers
 */
export function authResolvers(app: Koa, conn: Connection) {
  const User = getUserModel(conn);
  const config = generateDemoAuthModuleConfig(User, authConfig);

  return getDemoAuthResolvers(config);
}
