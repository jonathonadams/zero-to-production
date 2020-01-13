/* istanbul ignore file */

import {
  DevOrTestConfig,
  envToNumber,
  getEnvVariableOrWarn
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
    accessTokenPublicKey: getEnvVariableOrWarn('ACCESS_TOKEN_PUBLIC_KEY'),
    accessTokenPrivateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
    accessTokenIssuer: 'YOUR_COMPANY_HERE', // TODO
    refreshTokenPublicKey: getEnvVariableOrWarn('REFRESH_TOKEN_PUBLIC_KEY'),
    refreshTokenPrivateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
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
