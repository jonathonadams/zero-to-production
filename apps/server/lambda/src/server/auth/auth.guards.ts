import { Connection } from 'mongoose';
import { getUserModel } from '@uqt/server/core-data';
import {
  getGraphQlGuards,
  getRestGuards,
  generateAuthGuardConfig
} from '@uqt/server/auth';
import { config, authConfig } from '../../environments/environment';

/**
 * Guards for use in Routes
 */
export const createRestGuards = (conn: Connection) => {
  const User = getUserModel(conn);
  const guardConfig = generateAuthGuardConfig(config, authConfig, User);
  return getRestGuards(guardConfig);
};

/**
 * Guards to user with GraphQL
 */
export const createGraphQLGuards = (conn: Connection) => {
  const User = getUserModel(conn);
  const guardConfig = generateAuthGuardConfig(config, authConfig, User);

  return getGraphQlGuards(guardConfig);
};
