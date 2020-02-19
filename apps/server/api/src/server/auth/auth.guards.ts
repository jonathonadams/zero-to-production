import {
  getGraphQlGuards,
  getRestGuards,
  generateAuthGuardConfig
} from '@uqt/server/auth';
import { config, authConfig } from '../../environments';
import { User } from '../api/users';

const guardConfig = generateAuthGuardConfig(config, authConfig, User);

/**
 * Guards for use in Routes
 */
export const {
  verifyToken: verifyTokenRest,
  verifyActiveUser: verifyActiveUserRest
} = getRestGuards(guardConfig);

/**
 * Guards to user with GraphQL
 */
export const {
  verifyToken: verifyTokenGraphQL,
  verifyActiveUser: verifyActiveUserGraphQL
} = getGraphQlGuards(guardConfig);
