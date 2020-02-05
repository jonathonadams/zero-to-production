import mongoose from 'mongoose';
import { ServerConfig } from '@uqt/data';
import { createMongoConnectionString } from './utils';

export function dbConnection(config: ServerConfig, dbUrl?: string) {
  const url = dbUrl ? dbUrl : createMongoConnectionString(config);

  return mongoose.connect(url, config.databaseOptions).catch((err: any) => {
    console.error('There was an error connecting to the DataBase');
    console.error(err);
  });
}
