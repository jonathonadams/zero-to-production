import { verify } from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { authenticateRequest } from './auth.graphql';
import { AuthenticationRoles, IUser } from '@uqt/interfaces';
import {
  GuardConfig,
  JWKSGuarConfig,
  VerifyActiveUserConfig,
  VerifyTokenJWKSConfig,
  AuthMiddleware,
  VerifyTokenConfig
} from '../auth.interface';
import { isJWKS } from '../auth-utils';
import { retrievePublicKeyFormJWKS } from '../token';

export function getGraphQlGuards(config: GuardConfig | JWKSGuarConfig) {
  // Check if using JWKS or if public key is provided
  const verifyToken = isJWKS(config)
    ? checkTokenJWKS(config)
    : checkToken(config);

  const verifyActiveUser = checkUserIsActive(config);

  return createResolvers(verifyToken, verifyActiveUser);
}

function createResolvers(
  verifyToken: AuthMiddleware,
  verifyActiveUser: AuthMiddleware
) {
  return {
    verifyToken: authenticateRequest([verifyToken]),
    verifyActiveUser: authenticateRequest([verifyToken, verifyActiveUser]),
    verifyUserRole(role: AuthenticationRoles) {
      return authenticateRequest([
        verifyToken,
        verifyActiveUser,
        checkUserRole(role)
      ]);
    }
  };
}

/**
 * Verify the token signature
 * Throws an error if the token is invalid
 *
 * @param secret access token secret
 */
export function checkToken(config: VerifyTokenConfig): AuthMiddleware {
  return async (parent, args, ctx, info) => {
    try {
      ctx.state.user = verify(ctx.token, config.publicKey, {
        algorithms: ['RS256'],
        issuer: config.issuer
      });
    } catch (err) {
      throw Boom.unauthorized(null, 'Bearer');
    }
  };
}

export function checkTokenJWKS(config: VerifyTokenJWKSConfig): AuthMiddleware {
  const getPublicKey = retrievePublicKeyFormJWKS(config);

  return async (parent, args, ctx, info) => {
    try {
      const publicKey = await getPublicKey(ctx.token);

      ctx.state.user = verify(ctx.token, publicKey, {
        algorithms: ['RS256'],
        issuer: config.issuer
      });
    } catch (err) {
      throw Boom.unauthorized(null, 'Bearer');
    }
  };
}

/**
 * Verify the user is a valid user in the database
 * Throws an error if the user is invalid
 *
 * @param User
 */
export function checkUserIsActive({
  User
}: VerifyActiveUserConfig): AuthMiddleware {
  return async (parent, args, context, info) => {
    const id = context.state.user.sub;
    const user = await User.findById(id);
    if (!user || !user.active) throw Boom.unauthorized(null, 'Bearer');
    context.state.user = user;
  };
}

/**
 * Verify the user role is the required an admin
 * Throws an error if the user is not an admin invalid*
 */
export function checkUserRole(role: AuthenticationRoles): AuthMiddleware {
  return async (parent, args, context, info) => {
    if ((context.state.user as IUser).role !== role)
      throw Boom.unauthorized(null, 'Bearer');
  };
}
