/* istanbul ignore file */

import {
  DevOrTestConfig,
  envToNumber,
  getEnvVariableOrExit
} from '@uqt/api/config';

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
    accessTokenExpireTime: 1200,
    accessTokenPublicKey: getEnvVariableOrExit('ACCESS_TOKEN_PUBLIC_KEY'),
    accessTokenPrivateKey: getEnvVariableOrExit('ACCESS_TOKEN_PRIVATE_KEY'),
    refreshTokenPublicKey: getEnvVariableOrExit('REFRESH_TOKEN_PUBLIC_KEY'),
    refreshTokenPrivateKey: getEnvVariableOrExit('REFRESH_TOKEN_PRIVATE_KEY'),
    sendGridApiKey: process.env.SENDGRID_API_KEY || ''
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: process.env.MONGO_TEST_USER || 'mongo',
    pass: process.env.MONGO_TEST_PASSWORD || 'mongo'
  }
};

export default testConfig;
