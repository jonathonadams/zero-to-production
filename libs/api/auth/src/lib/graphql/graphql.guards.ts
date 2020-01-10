import { verify } from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { AuthMiddleware, authenticateRequest } from './auth.graphql';
import { IUserModel } from '@uqt/api/core-data';
import { AuthenticationRoles, IUser } from '@uqt/interfaces';

export function getGraphQlGuards(
  userModel: IUserModel,
  accessTokenPublicKey: string
) {
  // export the below array to use in the authenticate request function.
  const verifyTokenM = [checkToken(accessTokenPublicKey)];
  const verifyUserIsActiveM = [...verifyTokenM, checkUserIsActive(userModel)];

  return {
    verifyToken: authenticateRequest(verifyTokenM),
    verifyUserIsActive: authenticateRequest(verifyUserIsActiveM),
    verifyUserRole(role: AuthenticationRoles) {
      return authenticateRequest([...verifyUserIsActiveM, checkUserRole(role)]);
    }
  };
}

/**
 * Verify the token signature
 * Throws an error if the token is invalid
 *
 * @param secret access token secret
 */
export function checkToken(secret: string): AuthMiddleware {
  return async function checkTkn(parent, args, context, info) {
    try {
      context.state.token = verify(context.token, secret);
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
export function checkUserIsActive(User: IUserModel): AuthMiddleware {
  return async function checkActiveUser(parent, args, context, info) {
    const id = context.state.token.sub;
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
  return async function checkRole(parent, args, context, info) {
    if ((context.state.user as IUser).role !== role)
      throw Boom.unauthorized(null, 'Bearer');
  };
}
