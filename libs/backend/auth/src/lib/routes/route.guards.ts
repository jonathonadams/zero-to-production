import koa from 'koa';
import Boom from '@hapi/boom';
import { verify } from 'jsonwebtoken';
import { retrievePublicKeyFormJWKS } from '../token';
import {
  JWKSGuarConfig,
  GuardConfig,
  VerifyTokenConfig,
  VerifyTokenJWKSConfig,
  VerifyActiveUserConfig
} from '../auth.interface';
import { isJWKS } from '../auth-utils';

export function getRestGuards(config: GuardConfig | JWKSGuarConfig) {
  // Check if using JWKS guards or if public key is provided
  return {
    verifyToken: isJWKS(config) ? verifyTokenJWKS(config) : verifyToken(config),
    verifyActiveUser: verifyActiveUser(config)
  };
}

/**
 * npm module koa-bearer-token will get the bearer token from Authorize Header
 * and add it to ctx.request.token. Note this is not decoded
 */

export function verifyToken(config: VerifyTokenConfig) {
  return async (ctx: any, next: () => Promise<any>) => {
    /**
     * the encoded token is set at ctx.request.token if the verification
     * passes, replace the encoded token with the decoded token note that the verify function operates synchronously
     */
    try {
      ctx.state.user = verify(ctx.request.token, config.publicKey, {
        algorithms: ['RS256'],
        issuer: config.issuer,
        audience: config.audience
      });

      return next();
    } catch (err) {
      throw Boom.unauthorized(null, 'Bearer');
    }
  };
}

/**
 * Checks if the the token passed is valid
 *
 * Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will throw the error.
 */
export function verifyTokenJWKS(config: VerifyTokenJWKSConfig) {
  const getPublicKey = retrievePublicKeyFormJWKS(config);

  return async (ctx: any, next: () => Promise<any>) => {
    /**
     * the encoded token is set at ctx.request.token if the verification
     * passes, replace the encoded token with the decoded token note that the verify function operates synchronously
     */
    try {
      const publicKey = await getPublicKey(ctx.request.token);

      ctx.state.user = verify(ctx.request.token, publicKey, {
        algorithms: ['RS256'],
        issuer: config.issuer,
        audience: config.audience
      });

      return next();
    } catch (err) {
      throw Boom.unauthorized(null, 'Bearer');
    }
  };
}

/**
 *  Checks if the user is active
 *
 * This middleware will only be called on a route that is after the verify token
 * middleware has already been called. Hence you can guarantee that ctx.request.user
 * will contain the decoded token, and hence the 'sub' property will be the id
 *
 */
export function verifyActiveUser({ User }: VerifyActiveUserConfig) {
  return async (ctx: koa.ParameterizedContext, next: () => Promise<any>) => {
    try {
      const user = await User.findById(ctx.state.user.sub);
      if (!user || !user.active) throw Boom.unauthorized(null, 'Bearer');

      // Set the user on the ctx.state.user property
      ctx.state.user = user;
      return next();
    } catch (err) {
      throw err;
    }
  };
}
