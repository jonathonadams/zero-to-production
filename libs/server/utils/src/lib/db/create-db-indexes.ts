import mongoose from 'mongoose';
import { ServerConfig } from '@ztp/data';

export function createDbIndexes(config: ServerConfig, url: string) {
  return mongoose
    .connect(url, config.databaseOptions)
    .then(checkIndexes)
    .catch((err: any) => {
      console.error('There was an error connecting to the DataBase');
      console.error(err);
    });
}

async function checkIndexes(mg: typeof mongoose) {
  const modelNames = mg.modelNames();
  const models = modelNames.map((n) => mg.model(n));
  const indexes = models.map((m) => m.ensureIndexes({}));
  return Promise.all(indexes);
}
