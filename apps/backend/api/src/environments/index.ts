/* istanbul ignore file */

import { GlobalConfig, EnvironnementConfig } from '@uqt/data';
import { envToNumber } from '@uqt/server/config';
import devConfig from './development';
import prodConfig from './production';
import testConfig from './test';

/**
 * Config values common across all environments environments
 *
 * Application configuration belongs in this file and associated
 * environment files. The appropriate environment file is merged based on the
 * NODE_ENV variable: development, production, and test.
 *
 */
const config: GlobalConfig = {
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
 */
let environmentSettings: EnvironnementConfig;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    environmentSettings = prodConfig;
    break;
  case 'test':
  case 'testing':
    environmentSettings = testConfig;
    break;
  case 'development':
  case 'dev':
    environmentSettings = devConfig;
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
