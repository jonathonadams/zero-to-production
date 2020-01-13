/* istanbul ignore file */

import {
  ProductionConfig,
  getEnvVariableOrWarn,
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
      getEnvVariableOrWarn('ACCESS_TOKEN_EXPIRE_TIME'),
      86400
    ),
    accessTokenPublicKey: getEnvVariableOrWarn('ACCESS_TOKEN_PUBLIC_KEY'),
    accessTokenPrivateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
    accessTokenIssuer: 'YOUR_COMPANY_HERE',
    refreshTokenPublicKey: getEnvVariableOrWarn('REFRESH_TOKEN_PUBLIC_KEY'),
    refreshTokenPrivateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
    sendGridApiKey: getEnvVariableOrWarn('SENDGRID_API_KEY')
  },
  database: {
    connectionString: getEnvVariableOrWarn('DB_CONNECTION_STRING')
  }
};

export default prodConfig;
