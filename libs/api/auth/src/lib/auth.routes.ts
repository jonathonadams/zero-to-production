import Koa from 'koa';
import Router from 'koa-router';
import Boom from '@hapi/boom';
import {
  setupLoginController,
  setupRegisterController,
  setupAuthorizeController,
  setupRefreshAccessTokenController,
  setupRevokeRefreshTokenController,
  setupVerifyController
} from './auth.controllers';
import {
  RegistrationControllerConfig,
  VerifyControllerConfig,
  LoginControllerConfig,
  AuthorizeControllerConfig,
  RefreshControllerConfig,
  RevokeControllerConfig,
  AuthConfigWithRefreshTokens,
  AvailableControllerConfig
} from './auth.interface';
import { setupEmailVerification } from './send-email';

/**
 * This will register 6 routes for authentication
 *
 * '/authorize/login' -> return access token only when user logs in
 * '/authorize/register' -> return access token when user successfully registers
 * '/authorize/available' -> return on object indicating the availability of a given username
 * '/authorize/verify' -> verify the newly registered user (via email)
 * '/authorize' -> returns an access token and refresh token.
 * '/authorize/token' -> returns a new access token from a valid refresh token
 * '/authorize/token/revoke' -> revokes the provided refresh token.
 */

export function applyAuthRoutesWithRefreshTokens(
  config: AuthConfigWithRefreshTokens
) {
  return (app: Koa) => {
    const verificationEmail = setupEmailVerification(config);

    const router = new Router();
    router.post('/authorize/login', login(config));
    router.post(
      '/authorize/register',
      register({ ...config, verificationEmail })
    );
    router.post('/authorize/available', usernameAvailable(config));
    router.get('/authorize/verify', verify(config));
    router.post('/authorize', authorize(config));
    router.post('/authorize/token', refreshAccessToken(config));
    router.post('/authorize/token/revoke', revokeRefreshToken(config));

    return app.use(router.routes());
  };
}

/**
 *  A function that handles logging a user in
 *
 * @returns A signed JWT.
 */
export function login(config: LoginControllerConfig) {
  // Set up the controller with the config
  const loginController = setupLoginController(config);

  return async (ctx: Koa.ParameterizedContext) => {
    const username: string = (ctx.request as any).body.username;
    const password: string = (ctx.request as any).body.password;

    if (!username || !password)
      throw Boom.unauthorized('Username and password must be provided');

    ctx.body = await loginController(username, password);
  };
}

export function register(config: RegistrationControllerConfig) {
  const registerController = setupRegisterController(config);

  return async (ctx: Koa.ParameterizedContext) => {
    const user = (ctx.request as any).body;
    ctx.body = await registerController(user);
  };
}

export function verify(config: VerifyControllerConfig) {
  const verifyController = setupVerifyController(config);
  return async (ctx: Koa.ParameterizedContext) => {
    const email = ctx.query.email;
    const token = ctx.query.token;
    ctx.body = await verifyController(email, token);
  };
}

export function authorize(config: AuthorizeControllerConfig) {
  const authorizeController = setupAuthorizeController(config);
  return async (ctx: Koa.ParameterizedContext) => {
    const username = (ctx.request as any).body.username;
    const password = (ctx.request as any).body.password;

    if (!username || !password)
      throw Boom.unauthorized('Username and password must be provided');

    ctx.body = await authorizeController(username, password);
  };
}

export function refreshAccessToken(config: RefreshControllerConfig) {
  const refreshAccessTokenCtr = setupRefreshAccessTokenController(config);

  return async (ctx: Koa.ParameterizedContext) => {
    const username = (ctx.request as any).body.username;
    const refreshToken = (ctx.request as any).body.refreshToken;

    if (!username || !refreshToken)
      throw Boom.unauthorized('Username and password must be provided');

    const success = await refreshAccessTokenCtr(username, refreshToken);
    ctx.status = 403;
    ctx.body = success;
  };
}

export function revokeRefreshToken(config: RevokeControllerConfig) {
  const revokeTokenController = setupRevokeRefreshTokenController(config);
  return async (ctx: Koa.ParameterizedContext) => {
    const token: string = (ctx.request as any).body.refreshToken;
    ctx.body = await revokeTokenController(token);
  };
}

export function usernameAvailable(config: AvailableControllerConfig) {
  const { User } = config;
  return async (ctx: Koa.ParameterizedContext) => {
    const username: string = ctx.query.username;

    const resource = await User.findOne({ $text: { $search: username } });

    ctx.status = 200;
    ctx.body = { isAvailable: !resource ? true : false };
  };
}
