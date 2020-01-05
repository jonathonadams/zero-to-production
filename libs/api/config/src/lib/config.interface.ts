import { ConnectionOptions } from 'mongoose';
/*
 * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
 * http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html
 */

export interface GlobalConfig {
  hostUrl: string;
  port: number;
  databaseOptions: ConnectionOptions;
}

export type EnvironnementConfig = ProductionConfig | DevOrTestConfig;

export interface DevOrTestConfig {
  production: false;
  logging: false | 'dev';
  docs: boolean;
  databaseOptions: ConnectionOptions;
  expireTime: number;
  apiKeys: {
    sendGrid: string;
  };
  secrets: {
    accessToken: string;
    refreshToken: string;
  };
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
  expireTime: number;
  apiKeys: {
    sendGrid: string;
  };
  secrets: {
    accessToken: string;
    refreshToken: string;
  };
  database: {
    connectionString: string;
  };
}

export type ServerConfig = GlobalConfig & EnvironnementConfig;
