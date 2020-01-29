import mongoose from 'mongoose';
import { ServerConfig } from '@uqt/backend/config';

export function dbConnection(config: ServerConfig, dbUrl?: string) {
  const url = dbUrl ? dbUrl : createMongoConnectionString(config);

  return mongoose
    .connect(url, config.databaseOptions)
    .then(checkIndexes)
    .catch((err: any) => {
      console.error('There was an error connecting to the DataBase');
      console.error(err);
    });
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

async function checkIndexes(mg: typeof mongoose) {
  const modelNames = mg.modelNames();
  const models = modelNames.map(n => mg.model(n));
  const indexes = models.map(m => m.ensureIndexes());
  Promise.all(indexes).then(evt => console.log(evt));
}
