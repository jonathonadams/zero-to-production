/* istanbul ignore file */

import { randomBytes } from 'crypto';
import { EnvironnementConfig } from '@workspace/backend/interfaces';

/**
 * Production environment settings
 */
const prodConfig: EnvironnementConfig = {
  production: true,
  logging: false,
  docs: false,
  databaseOptions: {
    loggerLevel: 'error'
  },
  expireTime: Number(process.env.JWT_EXPIRE_TIME) || 86400,
  secrets: {
    accessToken:
      process.env.ACCESS_TOKEN_SECRET || randomBytes(16).toString('hex'),
    refreshToken:
      process.env.REFRESH_TOKEN_SECRET || 'some-super-secret-password'
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port:
      process.env.MONGO_TCP_PORT &&
      !Number.isNaN(parseInt(process.env.MONGO_TCP_PORT, 10))
        ? parseInt(process.env.MONGO_TCP_PORT, 10)
        : 27017,
    dbName: process.env.MONGO_DB || 'production_database',
    user: process.env.MONGO_USER || 'mongo',
    pass: process.env.MONGO_PASSWORD || 'mongo'
  }
};

export default prodConfig;
