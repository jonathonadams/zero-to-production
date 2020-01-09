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
import { IUserModel } from '@uqt/api/core-data';
import {
  IVerificationTokenModel,
  IRefreshTokenModel,
  RegistrationControllerConfig,
  VerifyUserControllerConfig,
  LoginControllerConfig
} from './auth.interface';
import { verificationEmail } from './send-email';

export interface AuthRoutesWithRefreshTokenConfig {
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
  User: IUserModel;
  VerificationToken: IVerificationTokenModel;
  RefreshToken: IRefreshTokenModel;
  sendGridApiKey: string;
  hostUrl: string;
}

//  verificationEmail: (to: string, token: string) => Promise<[any, {}]>;
/**
 * This will register 5 routes for authentication
 *
 * '/authorize/login' -> return access token only when user logs in
 * '/authorize/register' -> return access token when user successfully registers
 * '/authorize/verify' -> verify the newly registered user (via email)
 * '/authorize' -> returns an access token and refresh token.
 * '/authorize/token' -> returns a new access token from a valid refresh token
 * '/authorize/token/revoke' -> revokes the provided refresh token.
 */

export function applyAuthRoutesWithRefreshTokens(
  config: AuthRoutesWithRefreshTokenConfig
) {
  return (app: Koa) => {
    const router = new Router();
    router.post('/authorize/login', login(config));
    router.post(
      '/authorize/register',
      register({
        ...config,
        verificationEmail: verificationEmail(
          config.sendGridApiKey,
          config.hostUrl
        )
      })
    );
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

export function verify(config: VerifyUserControllerConfig) {
  const verifyController = setupVerifyController(config);
  return async (ctx: Koa.ParameterizedContext) => {
    const email = ctx.query.email;
    const token = ctx.query.token;
    ctx.body = await verifyController(email, token);
  };
}

export function authorize(config: {
  User: IUserModel;
  RefreshToken: IRefreshTokenModel;
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
}) {
  const authorizeController = setupAuthorizeController(config);
  return async (ctx: Koa.ParameterizedContext) => {
    const username = (ctx.request as any).body.username;
    const password = (ctx.request as any).body.password;

    if (!username || !password)
      throw Boom.unauthorized('Username and password must be provided');

    ctx.body = await authorizeController(username, password);
  };
}

export function refreshAccessToken(config: {
  User: IUserModel;
  RefreshToken: IRefreshTokenModel;
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
}) {
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

export function revokeRefreshToken(config: {
  RefreshToken: IRefreshTokenModel;
}) {
  const revokeTokenController = setupRevokeRefreshTokenController(config);
  return async (ctx: Koa.ParameterizedContext) => {
    const token: string = (ctx.request as any).body.refreshToken;
    ctx.body = await revokeTokenController(token);
  };
}
