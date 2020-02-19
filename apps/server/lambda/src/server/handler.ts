import Koa from 'koa';
import { Connection } from 'mongoose';
import serverless, { Handler } from 'serverless-http';
import { errorHandler, setupGlobalMiddleware } from '@uqt/server/middleware';
import LambdaServer from './server';

let handler: Handler;

export async function createHandler(conn: Connection) {
  if (handler) {
    console.log('=> using cached handler instance');
    return handler;
  }
  console.log('=> creating new handler');
  const koa = new Koa();

  setupGlobalMiddleware(koa);

  koa.use(errorHandler);

  const app = new LambdaServer(koa);
  handler = serverless(app.initializeServer(conn), { basePath: '' });
  return handler;
}
