import Koa from 'koa';
import { Connection } from 'mongoose';
import serverless, { Handler } from 'serverless-http';
import { globalMiddleware } from '@ztp/server/middleware';
import { config } from '../environments/environment';
import LambdaServer from './server';

let handler: Handler;

export async function createHandler(conn: Connection) {
  // If a cached handler exists, uses that one
  if (handler) {
    return handler;
  }
  const app = new Koa();
  app.proxy = config.production;

  app.use(globalMiddleware);

  const server = new LambdaServer(app);

  handler = serverless(server.initializeServer(conn), { basePath: '' });
  return handler;
}
