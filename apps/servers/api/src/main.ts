import ApiServer from './server/server';

// TODO -> Replace with Top Level await once released.
// Note minimum node version
const initServer = async () => {
  const app = new ApiServer();

  const server = await app.initializeServer();

  return server;
};

export default initServer;
