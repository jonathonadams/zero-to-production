import { ConnectionOptions } from 'mongoose';
/*
 * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
 * http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html
 */

export interface GlobalConfig {
  port: number;
  databaseOptions: ConnectionOptions;
}

export interface AuthConfig {
  authServerUrl: string;
  accessToken: {
    privateKey: string;
    expireTime: number;
    issuer: string;
    keyId: string;
    audience: string;
  };
  refreshToken: {
    privateKey: string;
    issuer: string;
    audience: string;
  };
  email: {
    hostUrl: string;
    sendGridApiKey: string;
  };
}

export type EnvironnementConfig = ProductionConfig | DevOrTestConfig;

export interface DevOrTestConfig {
  production: false;
  logging: false | 'dev';
  docs: boolean;
  databaseOptions: ConnectionOptions;
  auth: AuthConfig;
  database: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
}

export interface ProductionConfig {
  production: true;
  logging: false;
  docs: false;
  databaseOptions: ConnectionOptions;
  auth: AuthConfig;
  database: {
    connectionString: string;
  };
}

export type ServerConfig = GlobalConfig & EnvironnementConfig;
