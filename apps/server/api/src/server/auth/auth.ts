import Koa from 'koa';
import {
  applyAuthRoutes,
  generateAuthModuleConfig,
  createAuthSchema,
  getAuthResolvers,
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

const resolvers = getAuthResolvers(authModuleConfig);

/**
 * Auth Schema: all queries and mutation do NOT require to be authorized
 */
export const authSchema = createAuthSchema(resolvers);
