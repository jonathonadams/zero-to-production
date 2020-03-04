/* istanbul ignore file */

import { getEnvVariableOrWarn, envToNumber } from '@uqt/server/utils';
import { ProductionServerConfig } from '@uqt/data';
import { AuthEnvironnementConfig } from '@uqt/server/auth';

const audience = getEnvVariableOrWarn('AUDIENCE');
const authServerUrl = getEnvVariableOrWarn('AUTH_SERVER_URL');

// TODO -> They keyId should be some sort of hash or something
const keyId = 'some-random-key-id';

/**
 * Production environment settings
 */
export const prodConfig: ProductionServerConfig = {
  production: true,
  dbConnectionString: getEnvVariableOrWarn('DB_CONNECTION_STRING'),
  databaseOptions: {
    loggerLevel: 'error',
    autoIndex: true // TODO -> Don't auto index in production -> Create a K8's 'Job' (most probably an application)
  }
};

export const prodAuthConfig: AuthEnvironnementConfig = {
  jwksRoute: true,
  authServerUrl,
  accessToken: {
    privateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
    publicKey: getEnvVariableOrWarn('ACCESS_TOKEN_PUBLIC_KEY'),
    expireTime: envToNumber(
      getEnvVariableOrWarn('ACCESS_TOKEN_EXPIRE_TIME'),
      86400
    ),
    issuer: getEnvVariableOrWarn('ISSUER'),
    audience,
    keyId
  },
  refreshToken: {
    privateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
    publicKey: getEnvVariableOrWarn('REFRESH_TOKEN_PUBLIC_KEY'),
    issuer: getEnvVariableOrWarn('ISSUER'),
    audience
  },
  email: {
    sendGridApiKey: getEnvVariableOrWarn('SENDGRID_API_KEY'),
    authServerUrl
  }
};
