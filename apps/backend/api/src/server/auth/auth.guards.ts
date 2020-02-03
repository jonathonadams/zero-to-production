import { User } from '@uqt/server/core-data';
import { getGraphQlGuards, getRestGuards } from '@uqt/server/auth';
import config from '../../environments';

const guardConfig = {
  User,
  production: config.production,
  authServerUrl: config.auth.authServerUrl,
  issuer: config.auth.accessToken.issuer,
  audience: config.auth.accessToken.audience
};

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
  verifyActiveUser: verifyActiveUserGraphQL,
  verifyUserRole: verifyUserRoleGraphQL
} = getGraphQlGuards(guardConfig);
