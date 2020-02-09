import { createServer } from 'http';
import Koa from 'koa';
import Router from '@koa/router';
import { setupGlobalMiddleware } from '@uqt/server/config';
import { dbConnection } from '@uqt/server/database';
import { apolloServer } from './api/graphql';
import { applyApiEndpoints } from './api';

// UQT_UPDATE -> delete the below import
import { applyAuthRoutes } from './auth/demo.auth';
// UQT_UPDATE -> uncomment the below import
// import { applyAuthRoutes } from './auth/auth';

import config from '../environments';

/**
 * Crates a new API Server
 */
export default class ApiServer {
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
  async initializeServer(dbUrl?: string) {
    const app = this.app;
    const router = new Router();

    /**
     * Start the db connection, optionally pass in the connection url
     */
    await dbConnection(
      dbUrl ? dbUrl : config.dbConnectionString,
      config.databaseOptions
    );

    /**
     * Setup all the required middleware for the app
     */
    setupGlobalMiddleware(app, config.logging);

    /**
     * Apply the API endpoints
     */
    applyApiEndpoints(app);

    /**
     * apply all authorization routes
     */
    applyAuthRoutes(app);

    /**
     * Health check for kubernetes on google cloud
     *
     * Container must return status 200 on a designated health route. In k8's the default route is '/'
     * Must be configured on the deployment object to use this route for checking
     */
    router.get('/healthz', ctx => {
      ctx.status = 200;
    });

    /**
     * Apply the routes
     */
    app.use(router.routes());
    app.use(router.allowedMethods());

    const server = createServer(app.callback());

    /**
     * Listen on the desired port
     */
    server.listen({ port: config.port }, () => {
      console.log(`Server listening on port ${config.port}.`);
    });

    /**
     * Add the subscription options, this is a websocket connection
     */
    apolloServer.installSubscriptionHandlers(server);

    return server;
  }
}
