import { ConnectionOptions } from 'mongoose';
/*
 * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
 * http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html
 */

export interface GlobalServerConfig {
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
    authServerUrl: string;
    sendGridApiKey: string;
  };
}

export type EnvironnementConfig =
  | ProductionServerConfig
  | DevServerConfig
  | TestServerConfig;

export interface DevServerConfig {
  production: false;
  logging: false | 'dev';
  docs: boolean;
  dbConnectionString: string;
  databaseOptions: ConnectionOptions;
  auth: AuthConfig;
}

export interface TestServerConfig {
  port: number;
  production: false;
  logging: false | 'dev';
  docs: boolean;
  dbConnectionString: string;
  databaseOptions: ConnectionOptions;
  auth: AuthConfig;
}

export interface ProductionServerConfig {
  production: true;
  logging: false;
  docs: false;
  dbConnectionString: string;
  databaseOptions: ConnectionOptions;
  auth: AuthConfig;
}

export type ServerConfig = GlobalServerConfig & EnvironnementConfig;
