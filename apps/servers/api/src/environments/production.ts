/* istanbul ignore file */

import {
  ProductionConfig,
  getEnvVariableOrExit,
  envToNumber
} from '@uqt/api/config';

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
  auth: {
    accessTokenExpireTime: envToNumber(
      getEnvVariableOrExit('ACCESS_TOKEN_EXPIRE_TIME'),
      86400
    ),
    accessTokenPublicKey: getEnvVariableOrExit('ACCESS_TOKEN_PUBLIC_KEY'),
    accessTokenPrivateKey: getEnvVariableOrExit('ACCESS_TOKEN_PRIVATE_KEY'),
    refreshTokenPublicKey: getEnvVariableOrExit('REFRESH_TOKEN_PUBLIC_KEY'),
    refreshTokenPrivateKey: getEnvVariableOrExit('REFRESH_TOKEN_PRIVATE_KEY'),
    sendGridApiKey: process.env.SENDGRID_API_KEY || ''
  },
  database: {
    connectionString: process.env.DB_CONNECTION_STRING || ''
  }
};

export default prodConfig;
