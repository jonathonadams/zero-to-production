import mongoose from 'mongoose';
import { ServerConfig } from '@uqt/api/config';

export async function dbConnection(
  config: ServerConfig
): Promise<mongoose.Mongoose | undefined> {
  console.log('In Connect');
  console.log(config);

  const url = createMongoConnectionString(config);

  console.log(url);
  console.log(config.databaseOptions);
  try {
    return await mongoose.connect(url, config.databaseOptions);
  } catch (err) {
    console.error('There was an error connecting to the DataBase');
    console.error(err);
  }
}

function createMongoConnectionString(config: ServerConfig): string {
  if (config.production) {
    if (!config.database.connectionString) {
      console.error('No DataBase connection string provided');
    }
    return config.database.connectionString;
  } else {
    return `mongodb://${config.database.user}:${config.database.pass}@${config.database.host}:${config.database.port}`;
  }
}
