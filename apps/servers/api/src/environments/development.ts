/* istanbul ignore file */

import { DevOrTestConfig } from '@uqt/api/config';
import { envToNumber } from './util';

/**
 * Development environment settings
 */
const devConfig: DevOrTestConfig = {
  production: false,
  logging: 'dev',
  docs: true,
  databaseOptions: {
    autoIndex: true,
    loggerLevel: 'warn',
    dbName: process.env.MONGO_DEV_DB || 'development_database'
  },
  expireTime: envToNumber(process.env.JWT_EXPIRE_TIME, 86400),
  apiKeys: {
    sendGrid: process.env.SENDGRID_API_KEY || ''
  },
  secrets: {
    accessToken: process.env.ACCESS_TOKEN_SECRET || 'development-secret',
    refreshToken: process.env.REFRESH_TOKEN_SECRET || 'development-secret'
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: process.env.MONGO_DEV_USER || 'mongo',
    pass: process.env.MONGO_DEV_PASSWORD || 'mongo'
  }
};

export default devConfig;
