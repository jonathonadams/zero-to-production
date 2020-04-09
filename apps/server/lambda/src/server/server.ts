import Koa from 'koa';
import Router from '@koa/router';
import { Connection } from 'mongoose';
import { applyRestEndpoints } from './rest';
import { applyGraphQLEndpoint } from './graphql';
// ZTP_AFTER_CLONE -> delete the below import
import { applyAuthRoutes } from './auth/demo.auth';
// ZTP_AFTER_CLONE -> uncomment the below import
// import { applyAuthRoutes } from './auth/auth';

/**
 * Crates a new API Server
 */
export default class LambdaServer {
  constructor(private app: Koa) {}
  /**
   * Sets up all the server configuration and applies the routes
   * @param {Koa} app an instance of a koa server
  /**
   *
   *
   * @param {string} [dbUrl]
   * @returns {Server}
   * @memberof ApiServer
   */
  initializeServer(conn: Connection) {
    const app = this.app;
    const router = new Router();

    /**
     * apply all authorization routes
     */
    applyAuthRoutes(app, conn);

    applyGraphQLEndpoint(app, conn);
    applyRestEndpoints(app, conn);

    /**
     * Apply the routes
     */
    app.use(router.routes());
    app.use(router.allowedMethods());

    return app;
  }
}
