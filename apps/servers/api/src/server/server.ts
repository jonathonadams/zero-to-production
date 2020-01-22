import { createServer } from 'http';
import Koa from 'koa';
import Router from 'koa-router';
import { apolloServer } from './api/graphql';
import { setupMiddleware } from '@uqt/api/config';
import { applyApiEndpoints } from './api';
// UQT_UPDATE
import { applyAuthRoutes } from './auth/demo.auth';
// import { applyAuthRoutes } from './auth/auth';
import { dbConnection } from './db/db-connection';
import config from '../environments';
import { Mongoose } from 'mongoose';

/**
 * Crates a new API Server
 */
export default class ApiServer {
  /**
   * Sets up all the server configuration and applies the routes
   * @param {Koa} app an instance of a koa server
  /**
   *
   *
   * @param {string} [dbUrl]
   * @returns
   * @memberof ApiServer
   */
  async initializeServer(dbUrl?: string) {
    const app = new Koa();
    const router = new Router();

    // UQT_UPDATE -> This might not be appropriate for your specific needs
    // Set the proxy to true if in production mode as it will be hosted behind a revers
    // proxy such as Nginx or Traefik
    app.proxy = config.production;

    /**
     * Start the db connection, optionally pass in the connection url
     */
    const db: Mongoose = (await dbConnection(config, dbUrl)) as Mongoose;

    /**
     * Setup all the required middleware for the app
     */
    setupMiddleware({ app, logging: config.logging });

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
