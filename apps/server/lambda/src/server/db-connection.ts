import { createConnection, Connection } from 'mongoose';
import { config } from '../environments/environment';
import { initDbSchemasModels } from './db-schemas';

let connection: Connection | null = null;

/**
 * Close over the 'connection' reference so it can be reused if the function
 * is hot.
 *
 * @param dbUri connection url
 */
export async function connectToDatabase(dbUri: string) {
  if (connection === null) {
    /**
     * Because the environnement is as cloud function,
     * create a single connection with 'createConnection'
     * not a connection pool with 'connect'
     */
    connection = (await createConnection(dbUri, config.databaseOptions).catch(
      console.error
    )) as Connection;

    // define DD schemas
    initDbSchemasModels(connection);
  }

  return connection;
}
