/* istanbul ignore file */

import { getEnvVariableOrWarn, envToNumber } from '@uqt/server/utils';
import { ProductionServerConfig } from '@uqt/data';

const hostUrl = getEnvVariableOrWarn('HOST_URL');
const authServerUrl = getEnvVariableOrWarn('AUTH_SERVER_URL');

// TODO -> They keyId should be some sort of hash or something
const keyId = 'some-random-key-id';

/**
 * Production environment settings
 */
const prodConfig: ProductionServerConfig = {
  production: true,
  logging: false,
  docs: false,
  dbConnectionString: getEnvVariableOrWarn('DB_CONNECTION_STRING'),
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
  }
};

export default prodConfig;
