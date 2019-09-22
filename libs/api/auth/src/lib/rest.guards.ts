import koa from 'koa';
import Boom from '@hapi/boom';
import { verify } from 'jsonwebtoken';
import { IUserModel } from '@ngw/types';

/**
 * npm module koa-bearer-token will get the bearer token from Authorize Header
 * and add it to ctx.request.token. Note this is not decoded
 */

/**
 * Checks if the the token passed is valid
 */
export function verifyToken(secret: string) {
  return async function verifyTk(ctx: any, next: () => Promise<any>) {
    try {
      /**
       * the encoded token is set at ctx.request.token if the verification
       * passes, replace the encoded token with the decoded token note that the verify function  operates synchronously
       */
      try {
        ctx.state.token = verify(ctx.request.token, secret);
      } catch (err) {
        throw Boom.unauthorized();
      }
      return next();
    } catch (err) {
      throw err;
    }
  };
}

/**
 *  Checks if the user is active
 *
 * This middleware will only be called on a route that is after the verify token
 * middleware has already been called. Hence you can guarantee that ctx.request.token
 * will contain the decoded token, and hence the 'sub' property will be the id
 *
 */
export function verifyUserIsActive(User: IUserModel) {
  return async function verifyActive(
    ctx: koa.ParameterizedContext,
    next: () => Promise<any>
  ) {
    try {
      const user = await User.findById(ctx.state.token.sub);
      if (!user || !user.active) throw Boom.unauthorized('Unauthorized');

      // Set the user on the ctx.state.user property
      ctx.state.user = user;
      return next();
    } catch (err) {
      throw err;
    }
  };
}
