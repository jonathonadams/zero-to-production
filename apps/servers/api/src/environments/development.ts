/* istanbul ignore file */

import {
  DevOrTestConfig,
  getEnvVariableOrExit,
  envToNumber
} from '@uqt/api/config';

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
  auth: {
    accessTokenExpireTime: envToNumber(
      process.env.ACCESS_TOKEN_EXPIRE_TIME,
      86400
    ),
    accessTokenPublicKey: getEnvVariableOrExit('ACCESS_TOKEN_PUBLIC_KEY'),
    accessTokenPrivateKey: getEnvVariableOrExit('ACCESS_TOKEN_PRIVATE_KEY'),
    refreshTokenPublicKey: getEnvVariableOrExit('REFRESH_TOKEN_PUBLIC_KEY'),
    refreshTokenPrivateKey: getEnvVariableOrExit('REFRESH_TOKEN_PRIVATE_KEY'),
    sendGridApiKey: process.env.SENDGRID_API_KEY || ''
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: getEnvVariableOrExit('MONGO_DEV_USER'),
    pass: getEnvVariableOrExit('MONGO_DEV_PASSWORD')
  }
};

export default devConfig;
