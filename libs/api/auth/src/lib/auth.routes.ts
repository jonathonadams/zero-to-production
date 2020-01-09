import Koa from 'koa';
import Boom from '@hapi/boom';
import {
  loginController,
  registerController,
  authorizeController,
  refreshAccessTokenController,
  revokeRefreshTokenController,
  verifyController
} from './auth.controllers';
import { IUserModel } from '@uqt/api/core-data';
import {
  IVerificationTokenModel,
  IRefreshTokenModel,
  RegistrationControllerConfig,
  VerifyUserControllerConfig
} from './auth.interface';

/**
 *  A function that handles logging a user in
 *
 * @returns A signed JWT.
 */
export function login(config: {
  userModel: IUserModel;
  accessTokenPrivateKey: string;
  expireTime: number;
}) {
  // Set up the controller with the config
  const controller = loginController(config);

  return async function loginRt(ctx: Koa.ParameterizedContext) {
    const username: string = (ctx.request as any).body.username;
    const password: string = (ctx.request as any).body.password;

    if (!username || !password)
      throw Boom.unauthorized('Username and password must be provided');

    ctx.body = await controller(username, password);
  };
}

export function register(config: RegistrationControllerConfig) {
  const controller = registerController(config);

  return async function registerRt(ctx: Koa.ParameterizedContext) {
    const user = (ctx.request as any).body;
    ctx.body = await controller(user);
  };
}

export function verify(config: VerifyUserControllerConfig) {
  const controller = verifyController(config);
  return async function verifyRt(ctx: Koa.ParameterizedContext) {
    const email = ctx.query.email;
    const token = ctx.query.token;
    ctx.body = await controller(email, token);
  };
}

export function authorize(config: {
  userModel: IUserModel;
  refreshTokenModel: IRefreshTokenModel;
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
}) {
  const controller = authorizeController(config);
  return async function authorizeRt(ctx: Koa.ParameterizedContext) {
    const username = (ctx.request as any).body.username;
    const password = (ctx.request as any).body.password;

    if (!username || !password)
      throw Boom.unauthorized('Username and password must be provided');

    ctx.body = await controller(username, password);
  };
}

export function refreshAccessToken(config: {
  userModel: IUserModel;
  refreshTokenModel: IRefreshTokenModel;
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
}) {
  const controller = refreshAccessTokenController(config);
  return async function(ctx: Koa.ParameterizedContext) {
    const username = (ctx.request as any).body.username;
    const refreshToken = (ctx.request as any).body.refreshToken;

    if (!username || !refreshToken)
      throw Boom.unauthorized('Username and password must be provided');

    const success = await controller(username, refreshToken);
    ctx.status = 403;
    ctx.body = success;
  };
}

export function revokeRefreshToken(tokenModel: IRefreshTokenModel) {
  const controller = revokeRefreshTokenController(tokenModel);
  return async function revokeRefreshTkn(ctx: Koa.ParameterizedContext) {
    const token: string = (ctx.request as any).body.refreshToken;
    ctx.body = await controller(token);
  };
}
