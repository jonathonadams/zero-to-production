import { Connection } from 'mongoose';
import { getUserModel } from '@ztp/server/core-data';
import {
  getGraphQLGuards,
  getRestGuards,
  createAuthDirectives,
  VerifyToken,
} from '@ztp/server/auth';
import { authConfig } from '../../environments/environment';

const guard: VerifyToken = {
  issuer: authConfig.accessToken.issuer,
  audience: authConfig.accessToken.audience,
  publicKey: authConfig.accessToken.publicKey as string,
};

/**
 * Guards for use in Routes
 */
export const createRestGuards = (conn: Connection) => {
  const User = getUserModel(conn);

  const guardConfig = {
    authenticate: guard,
    activeUser: { User },
  };

  return getRestGuards(guardConfig);
};

/**
 * Guards to user with GraphQL
 */
export const createGraphQLGuards = (conn: Connection) => {
  const User = getUserModel(conn);

  const guardConfig = {
    authenticate: guard,
    activeUser: { User },
  };
  return getGraphQLGuards(guardConfig);
};

export const authDirectives = (conn: Connection) => {
  const User = getUserModel(conn);

  const guardConfig = {
    authenticate: guard,
    activeUser: { User },
  };

  return createAuthDirectives(guardConfig);
};
