// UQT_UPDATE -> delete this file

import Koa from 'koa';
import {
  applyDemoAuthRoutes,
  getDemoAuthResolvers,
  generateDemoAuthModuleConfig
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

/**
 * Auth Resolvers
 */
export const authResolvers = getDemoAuthResolvers(authModuleConfig);
