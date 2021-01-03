import type { Context, Next } from 'koa';
import compose from 'koa-compose';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { helmet } from './helmet';
import { authToken } from './auth-token';
import { errorHandler } from './err-handler';

// Configure middleware to parse income requests
export const globalMiddleware = compose([
  /**
   * This is a workaround because Koa does not allow you to set the cookie secure flag over http (behind a load balancer)
   */
  (ctx: Context, next: Next) => {
    ctx.cookies.secure = true;
    return next();
  },
  helmet({
    contentSecurityPolicy: false,
    expectCt: { enforce: true },
    hsts: {
      maxAge: 63072000, // two years
      preload: true,
    },
    xssFilter: false,
    noSniff: false,
  }),
  bodyParser(),
  cors({
    credentials: true,
  }),
  authToken(),
  // Custom error handling
  errorHandler,
]);
