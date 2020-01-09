import { GraphQLFieldResolver } from 'graphql';
import { IUserModel } from '@uqt/api/core-data';
import { loginController, registerController } from './auth.controllers';
import { IVerificationTokenModel } from './auth.interface';
import { IUser } from '@uqt/interfaces';
import { verificationEmail } from './send-email';

export function getAuthResolvers(
  userModel: IUserModel,
  verificationModel: IVerificationTokenModel
) {
  return function authConfig(
    accessTokenPrivateKey: string,
    accessTokenExpireTime: number,
    sendGridApiKey: string,
    hostUrl: string
  ) {
    return {
      authResolvers: {
        Mutation: {
          login: loginResolver({
            userModel,
            accessTokenPrivateKey,
            expireTime: accessTokenExpireTime
          }),
          register: registerResolver(
            userModel,
            verificationModel,
            verificationEmail(sendGridApiKey, hostUrl)
          )
        }
      }
    };
  };
}

/**
 *  A function that handles logging a user in
 *
 * @returns { Object } A User and signed JWT.
 */
export function loginResolver(config: {
  userModel: IUserModel;
  accessTokenPrivateKey: string;
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
  userModel: IUserModel,
  verificationModel: IVerificationTokenModel,
  sendVerificationEmail: (to: string, token: string) => Promise<[any, {}]>
): GraphQLFieldResolver<any, { input: IUser }, any> {
  const controller = registerController({
    User: userModel,
    VerificationToken: verificationModel,
    sendVerificationEmail
  });
  return async function register(root, args, context, info) {
    return controller(args.input);
  };
}
