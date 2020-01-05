/* istanbul ignore file */

import { DevOrTestConfig } from '@uqt/api/config';
import { envToNumber } from './util';

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
  expireTime: 1200,
  apiKeys: {
    sendGrid: process.env.SENDGRID_API_KEY || ''
  },
  secrets: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || 'test-secret',
    refreshToken: process.env.REFRESH_TOKEN_SECRET || 'test-secret'
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: process.env.MONGO_TEST_USER || 'mongo',
    pass: process.env.MONGO_TEST_PASSWORD || 'mongo'
  }
};

export default testConfig;
