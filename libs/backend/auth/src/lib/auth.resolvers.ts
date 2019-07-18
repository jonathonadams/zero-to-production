import { GraphQLFieldResolver } from 'graphql';
import { loginController, registerController } from './auth.controllers';
import { IUserModel, IUser } from 'dist/libs/shared/interface';

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
  return async function login(
    root,
    args,
    context,
    info
  ): Promise<{ token: string }> {
    const username: string = args.username;
    const password: string = args.password;

    return await loginController(config)(username, password);
  };
}

export function registerResolver(
  userModel: IUserModel
): GraphQLFieldResolver<any, { input: IUser }, any> {
  return async function register(root, args, context, info) {
    return registerController(userModel)(args.input);
  };
}
