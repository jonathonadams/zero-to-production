// ZTP_AFTER_CLONE -> delete this file
import Koa from 'koa';
import { Connection } from 'mongoose';
import { getUserModel } from '@ztp/server/core-data';
import {
  applyDemoAuthRoutes,
  generateDemoAuthModuleConfig,
  getDemoAuthResolvers,
  createDemoAuthSchema,
} from '@ztp/server/auth';
import { authConfig } from '../../environments/environment';

/**
 * Applies all required auth routes
 */
export function applyAuthRoutes(app: Koa, conn: Connection) {
  const User = getUserModel(conn);
  const config = generateDemoAuthModuleConfig(User, authConfig);

  app.use(applyDemoAuthRoutes(config));
}

/**
 * Auth Resolvers
 */
export function authResolvers(conn: Connection) {
  const User = getUserModel(conn);
  const config = generateDemoAuthModuleConfig(User, authConfig);

  return getDemoAuthResolvers(config);
}

export function createAuthSchemaFromConnection(conn: Connection) {
  const resolvers = authResolvers(conn);
  return createDemoAuthSchema(resolvers);
}
