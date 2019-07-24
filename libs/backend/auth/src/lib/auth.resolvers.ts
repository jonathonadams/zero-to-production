import { GraphQLFieldResolver } from 'graphql';
import { loginController, registerController } from './auth.controllers';
import { IUserModel, IUser } from '@workspace/shared/interfaces';

/**
 *  A function that handles logging a user in
 *
 * @returns { Object } A User and signed JWT.
 */
export function loginResolver(config: {
  userModel: IUserModel;
  secret: string;
  expireTime: number;
}): GraphQLFieldResolver<any, { username: string; password: string }, any> {
  const controller = loginController(config);

  return async function login(
    root,
    args,
    context,
    info
  ): Promise<{ token: string }> {
    const username: string = args.username;
    const password: string = args.password;

    return await controller(username, password);
  };
}

export function registerResolver(
  userModel: IUserModel
): GraphQLFieldResolver<any, { input: IUser }, any> {
  const controller = registerController(userModel);
  return async function register(root, args, context, info) {
    return controller(args.input);
  };
}
