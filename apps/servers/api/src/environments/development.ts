/* istanbul ignore file */

import {
  DevOrTestConfig,
  getEnvVariableOrWarn,
  envToNumber
} from '@uqt/api/config';
import { generateKeyPairSync } from 'crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
    // cipher: 'aes-256-cbc'
    // passphrase: 'top secret'
  }
});

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
    // accessTokenPublicKey: getEnvVariableOrWarn('ACCESS_TOKEN_PUBLIC_KEY'),
    // accessTokenPrivateKey: getEnvVariableOrWarn('ACCESS_TOKEN_PRIVATE_KEY'),
    accessTokenPrivateKey: privateKey,
    accessTokenPublicKey: publicKey,
    accessTokenIssuer: 'YOUR_COMPANY_HERE', // TODO
    refreshTokenPublicKey: getEnvVariableOrWarn('REFRESH_TOKEN_PUBLIC_KEY'),
    refreshTokenPrivateKey: getEnvVariableOrWarn('REFRESH_TOKEN_PRIVATE_KEY'),
    sendGridApiKey: getEnvVariableOrWarn('SENDGRID_API_KEY')
  },
  database: {
    host: process.env.MONGO_TCP_ADDR || 'localhost',
    port: envToNumber(process.env.MONGO_TCP_PORT, 27017),
    user: getEnvVariableOrWarn('MONGO_DEV_USER'),
    pass: getEnvVariableOrWarn('MONGO_DEV_PASSWORD')
  }
};

export default devConfig;
