/* istanbul ignore file */

import { getEnvVariableOrWarn, envToNumber } from '@uqt/server/utils';
import { DevConfig } from '@uqt/data';

const hostUrl = process.env.HOST_URL || `http://localhost:${process.env.PORT}`;
const authServerUrl =
  process.env.AUTH_SERVER_URL || `http://localhost:${process.env.PORT}`;

// TODO -> They keyId should be some sort of hash or something
const keyId = 'some-random-key-id';

/**
 * Development environment settings
 */
const devConfig: DevConfig = {
  production: false,
  logging: 'dev',
  docs: true,
  databaseOptions: {
    autoIndex: true,
    loggerLevel: 'warn',
    dbName: process.env.MONGO_DEV_DB || 'development_database'
  },
  auth: {
    authServerUrl,
    accessToken: {
      privateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
      expireTime: envToNumber(process.env.ACCESS_TOKEN_EXPIRE_TIME, 86400),
      issuer: getEnvVariableOrWarn('ISSUER'),
      audience: hostUrl,
      keyId
    },
    refreshToken: {
      privateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
      issuer: getEnvVariableOrWarn('ISSUER'),
      audience: hostUrl
    },
    email: {
      authServerUrl,
      sendGridApiKey: getEnvVariableOrWarn('SENDGRID_API_KEY')
    }
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: getEnvVariableOrWarn('MONGO_DEV_USER'),
    pass: getEnvVariableOrWarn('MONGO_DEV_PASSWORD')
  }
};

export default devConfig;
