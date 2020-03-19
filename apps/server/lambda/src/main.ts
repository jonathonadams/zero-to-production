import { config } from './environments/environment';
import { connectToDatabase } from './server/db-connection';
import { createHandler } from './server/handler';

export const handler = async (event: any, ctx: any) => {
  // Set to false to send the response back right away
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.htmlk
  ctx.callbackWaitsForEmptyEventLoop = false;

  // initialize the db connection
  const con = await connectToDatabase(config.dbConnectionString);
  // create the server
  const http = await createHandler(con);

  // you can do other things here
  const result = await http(event, ctx);
  // and here
  return result;
};
