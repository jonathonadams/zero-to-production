// UQT_UPDATE -> delete this file

import Koa from 'koa';
import {
  applyDemoAuthRoutes,
  generateDemoAuthModuleConfig,
  createDemoAuthSchema,
  getDemoAuthResolvers
} from '@uqt/server/auth';
import { authConfig } from '../../environments';
import { User } from '../api/users';

const authModuleConfig = generateDemoAuthModuleConfig(User, authConfig);

/**
 * Applies all required auth routes
 */
export function applyApiAuthRoutes(app: Koa) {
  app.use(applyDemoAuthRoutes(authModuleConfig));
}

const resolvers = getDemoAuthResolvers(authModuleConfig);

/**
 * Auth Schema: all queries and mutation do NOT require to be authorized
 */
export const authSchema = createDemoAuthSchema(resolvers);
