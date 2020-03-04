import Koa from 'koa';
import {
  getAuthResolvers,
  applyAuthRoutes,
  generateAuthModuleConfig
} from '@uqt/server/auth';
import { authConfig } from '../../environments';
import { User } from '../api/users';
import { VerificationToken, RefreshToken } from './models';

const authModuleConfig = generateAuthModuleConfig(
  User,
  VerificationToken,
  RefreshToken,
  authConfig
);

/**
 * Applies all required auth routes
 */
export function applyApiAuthRoutes(app: Koa) {
  app.use(applyAuthRoutes(authModuleConfig));
}

/**
 * Auth Resolvers
 */
export const authResolvers = getAuthResolvers(authModuleConfig);
