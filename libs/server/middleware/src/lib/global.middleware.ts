import Koa from 'koa';
// @ts-ignore
import helmet from 'koa-helmet';
// @ts-ignore
import bearerToken from 'koa-bearer-token';
// @ts-ignore
import compress from 'koa-compress';
// @ts-ignore
import bodyParser from 'koa-bodyparser';
// @ts-ignore
import cors from 'kcors';
import { errorHandler } from './err-handler';

// Configure middleware to parse income requests
export function setupGlobalMiddleware(app: Koa) {
  app.use(helmet());
  app.use(compress());
  app.use(bodyParser());
  app.use(cors());
  app.use(bearerToken());

  // Custom error handling
  app.use(errorHandler);
}
