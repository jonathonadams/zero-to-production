import Koa from 'koa';
import config from './environments';
import ApiServer from './server/server';

const app = new Koa();

/**
 * UQT_UPDATE -> This might not be appropriate for your specific needs
 *
 * Set the proxy to true if in production mode as the server will be hosted
 * behind a revers proxy such as Nginx or Traefik
 */
app.proxy = config.production;

export const server = initServer();

// TODO -> Replace with Top Level await once released.
// Note minimum node version
async function initServer() {
  const apiServer = new ApiServer(app);
  return await apiServer.initializeServer();
}
