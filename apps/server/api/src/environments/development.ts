/* istanbul ignore file */

import { getEnvVariableOrWarn, envToNumber } from '@ztp/server/utils';
import { DevServerConfig } from '@ztp/data';
import { AuthEnvironnementConfig } from '@ztp/server/auth';

const audience = process.env.AUDIENCE || `http://localhost:${process.env.PORT}`;
const authServerUrl =
  process.env.AUTH_SERVER_URL || `http://localhost:${process.env.PORT}`;

// TODO -> They keyId should be some sort of hash or something
const keyId = 'some-random-key-id';

/**
 * Development environment settings
 */
export const devConfig: DevServerConfig = {
  production: false,
  dbConnectionString: getEnvVariableOrWarn('DB_CONNECTION_STRING'),
  databaseOptions: {
    autoIndex: true,
    loggerLevel: 'warn',
    dbName: process.env.MONGO_DEV_DB || 'development_database',
  },
};

export const devAuthConfig: AuthEnvironnementConfig = {
  jwksRoute: true,
  authServerUrl,
  accessToken: {
    privateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
    publicKey: getEnvVariableOrWarn('ACCESS_TOKEN_PUBLIC_KEY'),
    expireTime: envToNumber(process.env.ACCESS_TOKEN_EXPIRE_TIME, 86400),
    issuer: getEnvVariableOrWarn('ISSUER'),
    audience,
    keyId,
  },
  refreshToken: {
    privateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
    publicKey: getEnvVariableOrWarn('REFRESH_TOKEN_PUBLIC_KEY'),
    issuer: getEnvVariableOrWarn('ISSUER'),
    audience,
  },
  email: {
    authServerUrl,
    sendGridApiKey: getEnvVariableOrWarn('SENDGRID_API_KEY'),
  },
};