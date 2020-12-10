import { ConnectOptions } from 'mongoose';
/*
 * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-connect
 * http://mongodb.github.io/node-mongodb-native/3.0/api/MongoClient.html
 */

export interface GlobalServerConfig {
  port?: number;
  databaseOptions: ConnectOptions;
  dbConnectionString?: string;
  production?: boolean;
  sendgridApiKey?: string;
}

export type EnvironmentConfig =
  | ProductionServerConfig
  | DevServerConfig
  | TestServerConfig;

export interface DevServerConfig {
  production: false;
  dbConnectionString: string;
  databaseOptions: ConnectOptions;
}

export interface TestServerConfig {
  production: false;
  dbConnectionString: string;
  databaseOptions: ConnectOptions;
}

export interface ProductionServerConfig {
  production: true;
  dbConnectionString: string;
  databaseOptions?: ConnectOptions;
}

export type ServerConfig = GlobalServerConfig & EnvironmentConfig;
