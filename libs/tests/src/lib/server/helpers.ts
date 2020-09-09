import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { graphql, GraphQLSchema } from 'graphql';

/**
 * Helper function to generate ObjectID, note it returns the hex string of the ObjectId
 */
export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}

export const runQuery = (schema: GraphQLSchema) => {
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
        token,
      },
      variables
    );
  };
};

/**
 * Helper function to setup Mongo Memory server
 */
export async function setupTestDB(): Promise<{
  dbUri: string;
  mongoServer: MongoMemoryServer;
}> {
  const mongoServer = new MongoMemoryServer();
  const dbUri: string = await mongoServer.getUri();
  return {
    dbUri,
    mongoServer,
  };
}
