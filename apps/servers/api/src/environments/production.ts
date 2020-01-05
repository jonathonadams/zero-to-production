/* istanbul ignore file */

import { randomBytes } from 'crypto';
import { ProductionConfig } from '@uqt/api/config';
import { envToNumber } from './util';

/**
 * Production environment settings
 */
const prodConfig: ProductionConfig = {
  production: true,
  logging: false,
  docs: false,
  databaseOptions: {
    loggerLevel: 'error'
  },
  expireTime: envToNumber(process.env.JWT_EXPIRE_TIME, 86400),
  apiKeys: {
    sendGrid: process.env.SENDGRID_API_KEY || ''
  },
  secrets: {
    accessToken:
      process.env.ACCESS_TOKEN_SECRET || randomBytes(16).toString('hex'),
    refreshToken:
      process.env.REFRESH_TOKEN_SECRET || 'some-super-secret-password'
  },
  database: {
    connectionString: process.env.DB_CONNECTION_STRING || ''
  }
};

export default prodConfig;
