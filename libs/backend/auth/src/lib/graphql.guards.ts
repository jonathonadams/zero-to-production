import { verify } from 'jsonwebtoken';
import { unauthorized } from '@hapi/boom';
import { IUserModel, IUser } from '@workspace/shared/interfaces';
import { AuthenticationRoles } from '@workspace/shared/enums';
import { AuthMiddleware } from './auth.graphql';

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
      throw unauthorized('Unauthorized.');
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
    if (!user || !user.active) throw unauthorized();
    context.state.user = user;
  };
}

/**
 * Verify the user role is the required an admin
 * Throws an error if the user is not an admin invalid*
 */
export function checkUserRole(role: AuthenticationRoles): AuthMiddleware {
  return async function checkRole(parent, args, context, info) {
    if ((context.state.user as IUser).role !== role) throw unauthorized();
  };
}
