import Koa from 'koa';
import { unauthorized } from '@hapi/boom';
import { IUserModel, IRefreshTokenModel } from '@workspace/shared/interfaces';
import {
  loginController,
  registerController,
  authorizeController,
  refreshAccessTokenController,
  revokeRefreshTokenController
} from './auth.controllers';

/**
 *  A function that handles logging a user in
 *
 * @returns A signed JWT.
 */
export function login(config: {
  userModel: IUserModel;
  secret: string;
  expireTime: number;
}) {
  // Set up the controller with the config
  const controller = loginController(config);

  return async function loginRt(ctx: Koa.ParameterizedContext) {
    const username: string = (ctx.request as any).body.username;
    const password: string = (ctx.request as any).body.password;

    if (!username || !password)
      throw unauthorized('A username and password must be provided');

    ctx.body = await controller(username, password);
  };
}

export function register(User: IUserModel) {
  const controller = registerController(User);
  return async function registerRt(ctx: Koa.ParameterizedContext) {
    const user = (ctx.request as any).body;
    ctx.body = await controller(user);
  };
}

export function authorize(config: {
  userModel: IUserModel;
  refreshTokenModel: IRefreshTokenModel;
  accessTokenSecret: string;
  accessTokenExpireTime: number;
  refreshTokenSecret: string;
}) {
  const controller = authorizeController(config);
  return async function authorizeRt(ctx: Koa.ParameterizedContext) {
    const username = (ctx.request as any).body.username;
    const password = (ctx.request as any).body.password;

    if (!username || !password)
      throw unauthorized('Not all parameters provided.');

    ctx.body = await controller(username, password);
  };
}

export function refreshAccessToken(config: {
  userModel: IUserModel;
  refreshTokenModel: IRefreshTokenModel;
  accessTokenSecret: string;
  accessTokenExpireTime: number;
  refreshTokenSecret: string;
}) {
  const controller = refreshAccessTokenController(config);
  return async function(ctx: Koa.ParameterizedContext) {
    const username = (ctx.request as any).body.username;
    const refreshToken = (ctx.request as any).body.refreshToken;

    if (!username || !refreshToken)
      throw unauthorized('Not all parameters provided.');

    ctx.body = await controller(username, refreshToken);
  };
}

export function revokeRefreshToken(tokenModel: IRefreshTokenModel) {
  const controller = revokeRefreshTokenController(tokenModel);
  return async function revokeRefreshTkn(ctx: Koa.ParameterizedContext) {
    const token: string = (ctx.request as any).body.refreshToken;
    ctx.body = await controller(token);
  };
}
