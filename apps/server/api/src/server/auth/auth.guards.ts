import {
  getGraphQLGuards,
  getRestGuards,
  generateAuthGuardConfig,
  createAuthDirectives
} from '@uqt/server/auth';
import { config, authConfig } from '../../environments';
import { User } from '../api/users';

const guardConfig = generateAuthGuardConfig(config, authConfig, User);

/**
 * Guards for use in Routes
 */
export const {
  authenticate: authenticateRest,
  authenticateUser: authenticateUserRest
} = getRestGuards(guardConfig);

/**
 * Guards to user with GraphQL
 */
export const {
  authenticate: authenticateGraphQL,
  authenticateUser: authenticateUserGraphQL
} = getGraphQLGuards(guardConfig);

export const authDirectives = createAuthDirectives(guardConfig);
