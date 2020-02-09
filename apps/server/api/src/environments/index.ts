/* istanbul ignore file */

import { GlobalServerConfig, EnvironnementConfig } from '@uqt/data';
import { envToNumber } from '@uqt/server/utils';
import DevServerConfig from './development';
import prodConfig from './production';
import TestServerConfig from './test';

/**
 * Config values common across all environments environments
 *
 * Application configuration belongs in this file and associated
 * environment files. The appropriate environment file is merged based on the
 * NODE_ENV variable: development, production, and test.
 *
 */
const config: GlobalServerConfig = {
  /**
   * The port the server will listen on
   */
  port: envToNumber(process.env.PORT, 3000),

  /**
   * Global database options for Mongoose
   */
  databaseOptions: {
    autoIndex: false, // default for production, overridden in development
    useNewUrlParser: true,
    promiseLibrary: Promise,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
};

/**
 * Assign values based on current execution environment
 *
 * TODO -> Top level await when ts is updated to 3.8
 */
let environmentSettings: EnvironnementConfig;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    environmentSettings = prodConfig;
    break;
  case 'test':
  case 'testing':
    environmentSettings = TestServerConfig;
    break;
  case 'development':
  case 'dev':
    environmentSettings = DevServerConfig;
    break;
  default:
    environmentSettings = prodConfig;
    break;
}

/**
 * Merge overrides the global settings with the appropriate environment settings
 */
export default {
  ...config,
  ...environmentSettings,
  ...{
    databaseOptions: {
      ...config.databaseOptions,
      ...environmentSettings.databaseOptions
    }
  }
};
