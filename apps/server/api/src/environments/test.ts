/* istanbul ignore file */

import { envToNumber, getEnvVariableOrWarn } from '@uqt/server/utils';
import { DevOrTestConfig } from '@uqt/data';

const hostUrl = `http://localhost:${process.env.PORT}`;
const authServerUrl = `http://localhost:${process.env.PORT}`;

// TODO -> They keyId should be some sort of hash or something
const keyId = 'some-random-key-id';

/**
 * Test environment settings
 */
const testConfig: DevOrTestConfig = {
  production: false,
  logging: 'dev',
  docs: true,
  databaseOptions: {
    loggerLevel: 'warn',
    dbName: process.env.MONGO_TEST_DB || 'test_database'
  },
  auth: {
    authServerUrl,
    accessToken: {
      privateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
      expireTime: 86400,
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
      sendGridApiKey: process.env.SENDGRID_API_KEY || ''
    }
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: process.env.MONGO_TEST_USER || 'mongo',
    pass: process.env.MONGO_TEST_PASSWORD || 'mongo'
  }
};

export default testConfig;
