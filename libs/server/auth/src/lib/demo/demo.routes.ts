// UQT_UPDATE -> Delete this file

import Koa from 'koa';
import Router from '@koa/router';
import Boom from '@hapi/boom';
import {
  demoSetupLoginController,
  demoSetupRegisterController
} from './demo.controllers';
import {
  DemoRegistrationControllerConfig,
  DemoAuthModuleConfig
} from './demo.interface';
import {
  LoginControllerConfig,
  AvailableControllerConfig
} from '../auth.interface';
import { createJsonWebKeySetRoute } from '../routes/jwks';

/**
 * This will register 3 routes for authentication
 *
 * '/authorize/login' -> return access token when user logs in
 * '/authorize/register' -> return access token when user successfully registers
 * '/authorize/available' -> return on object indicating the availability of a given username
 */

export function applyDemoAuthRoutes(config: DemoAuthModuleConfig) {
  const router = new Router();
  router.post('/authorize/login', login(config.login));
  router.post('/authorize/register', register(config.register));
  router.get('/authorize/available', usernameAvailable(config.login));

  // Only crete the JWKS if the config is specified
  if (config.jwks) {
    createJsonWebKeySetRoute(config.jwks, router);
  }

  return router.routes();
}

/**
 *  A function that handles logging a user in
 *
 * @returns A signed JWT.
 */
export function login(config: LoginControllerConfig) {
  // Set up the controller with the config
  const loginController = demoSetupLoginController(config);

  return async (ctx: Koa.ParameterizedContext) => {
    const { username, password } = restUsernameAndPasswordCheck(ctx);

    ctx.body = await loginController(username, password);
  };
}

export function register(config: DemoRegistrationControllerConfig) {
  const registerController = demoSetupRegisterController(config);

  return async (ctx: Koa.ParameterizedContext) => {
    const user = (ctx.request as any).body;
    ctx.body = await registerController(user);
  };
}

export function usernameAvailable(config: AvailableControllerConfig) {
  const { User } = config;
  return async (ctx: Koa.ParameterizedContext) => {
    const username: string | undefined = ctx.query.username;

    let isAvailable: boolean;
    if (username) {
      const resource = await User.findOne({ $text: { $search: username } });
      isAvailable = !resource ? true : false;
    } else {
      isAvailable = false;
    }

    ctx.status = 200;
    ctx.body = { isAvailable };
  };
}

function restUsernameAndPasswordCheck(ctx: Koa.ParameterizedContext) {
  const username: string = (ctx.request as any).body.username;
  const password: string = (ctx.request as any).body.password;

  if (!username || !password)
    throw Boom.unauthorized('Username and password must be provided');
  return {
    username,
    password
  };
}
