/* istanbul ignore file */

import { EnvironnementConfig } from '@ngw/types';
import { envToNumber } from './util';

/**
 * Test environment settings
 */
const testConfig: EnvironnementConfig = {
  production: false,
  logging: 'dev',
  docs: true,
  databaseOptions: {
    loggerLevel: 'warn'
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
    dbName: process.env.MONGO_TEST_DB || 'test_database',
    user: process.env.MONGO_TEST_USER || 'mongo',
    pass: process.env.MONGO_TEST_PASSWORD || 'mongo'
  }
};

export default testConfig;
