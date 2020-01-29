/* istanbul ignore file */

import {
  ProductionConfig,
  getEnvVariableOrWarn,
  envToNumber
} from '@uqt/backend/config';

const hostUrl = getEnvVariableOrWarn('HOST_URL');
const authServerUrl = getEnvVariableOrWarn('AUTH_SERVER_URL');

// TODO -> They keyId should be some sort of hash or something
const keyId = 'some-random-key-id';

/**
 * Production environment settings
 */
const prodConfig: ProductionConfig = {
  production: true,
  logging: false,
  docs: false,
  databaseOptions: {
    loggerLevel: 'error',
    autoIndex: true // TODO -> Don't auto index in production -> Create a K8's 'Job' (most probably an application)
  },
  auth: {
    authServerUrl,
    accessToken: {
      privateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
      expireTime: envToNumber(
        getEnvVariableOrWarn('ACCESS_TOKEN_EXPIRE_TIME'),
        86400
      ),
      issuer: getEnvVariableOrWarn('ISSUER'),
      audience: hostUrl,
      keyId
    },
    refreshToken: {
      privateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
      issuer: getEnvVariableOrWarn('ISSUER'),
      audience: hostUrl
    },
    email: {
      sendGridApiKey: getEnvVariableOrWarn('SENDGRID_API_KEY'),
      authServerUrl
    }
  },
  database: {
    connectionString: getEnvVariableOrWarn('DB_CONNECTION_STRING')
  }
};

export default prodConfig;
