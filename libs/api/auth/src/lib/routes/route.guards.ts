import koa from 'koa';
import Boom from '@hapi/boom';
import { verify } from 'jsonwebtoken';
import { IUserModel } from '@uqt/api/core-data';

export function getRestGuards(
  userModel: IUserModel,
  publicKey: string,
  issuer: string
) {
  return {
    verifyToken: verifyToken(publicKey, issuer),
    verifyUserIsActive: verifyUserIsActive(userModel)
  };
}

/**
 * npm module koa-bearer-token will get the bearer token from Authorize Header
 * and add it to ctx.request.token. Note this is not decoded
 */

/**
 * Checks if the the token passed is valid
 *
 * Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
 */
export function verifyToken(publicKey: string, issuer: string) {
  return async (ctx: any, next: () => Promise<any>) => {
    try {
      /**
       * the encoded token is set at ctx.request.token if the verification
       * passes, replace the encoded token with the decoded token note that the verify function operates synchronously
       */
      try {
        ctx.state.token = verify(ctx.request.token, publicKey, {
          algorithms: ['RS256'],
          issuer
        });
      } catch (err) {
        throw Boom.unauthorized(null, 'Bearer');
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
  return async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
    try {
      const user = await User.findById(ctx.state.token.sub);
      if (!user || !user.active) throw Boom.unauthorized(null, 'Bearer');

      // Set the user on the ctx.state.user property
      ctx.state.user = user;
      return next();
    } catch (err) {
      throw err;
    }
  };
}
