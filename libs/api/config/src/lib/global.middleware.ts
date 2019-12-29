import Koa from 'koa';
// @ts-ignore - deceleration file
import helmet from 'koa-helmet';
// @ts-ignore - deceleration file
import morgan from 'koa-morgan';
// @ts-ignore - deceleration file
import bearerToken from 'koa-bearer-token';
// @ts-ignore - deceleration file
import compress from 'koa-compress';
// @ts-ignore - deceleration file
import bodyParser from 'koa-bodyparser';
// @ts-ignore - deceleration file
import cors from 'kcors';
import { errorHandler, errorLogger } from './err-handler';

// Configure middleware to parse income requests
export function setupMiddleware({
  app,
  logging
}: {
  app: Koa;
  logging: string | false;
}) {
  app.use(helmet());
  app.use(compress());
  app.use(bodyParser());
  app.use(cors());
  app.use(bearerToken());

  if (logging) {
    app.use(morgan(logging)); // configure the logging based on node environment
  }

  // Custom error handling
  app.use(errorHandler);

  app.on('error', errorLogger);
}
