import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { graphql, GraphQLSchema } from 'graphql';

// export interface RESTTestResource<T> {
//   model: any;
//   resourceName: string;
//   urlString: string;
//   resourceToCreate: any;
//   resourceToUpdate: any;
//   testDependents?: TestDependents[];
// }

// export interface GraphQLTestResource<T> {
//   model: any;
//   resourceName: string;
//   queryName: string;
//   resourceToCreate: any;
//   resourceToUpdate: any;
//   testDependents?: TestDependents[];
// }

// export interface TestDependents {
//   model: any;
//   resource: any;
// }

/**
 * Helper function to generate ObjectID, note it returns the hex string of the ObjectId
 */
export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}
export const runQuery = function(schema: GraphQLSchema) {
  return async (
    query: string,
    variables: { [prop: string]: any },
    token: string
  ) => {
    return graphql(
      schema,
      query,
      null,
      {
        state: {},
        token
      },
      variables
    );
  };
};

/**
 * Helper function to setup Mongo Memory server
 */
export async function setupTestDB(): Promise<{
  db: mongoose.Mongoose;
  mongoServer: MongoMemoryServer;
}> {
  const mongoServer = new MongoMemoryServer();
  const mongoUri: string = await mongoServer.getConnectionString();
  const mongooseOpts: mongoose.ConnectionOptions = {
    promiseLibrary: Promise,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
  };

  const db: mongoose.Mongoose = await mongoose.connect(mongoUri, mongooseOpts);
  console.log(`MongoDB successfully connected to ${mongoUri}`);

  return {
    db: db,
    mongoServer: mongoServer
  };
}
