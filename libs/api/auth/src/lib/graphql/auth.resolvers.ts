import { GraphQLFieldResolver } from 'graphql';
import {
  setupLoginController,
  setupRegisterController
} from '../auth.controllers';
import {
  LoginControllerConfig,
  RegistrationControllerConfig,
  AuthModuleConfig
} from '../auth.interface';
import { IUser } from '@uqt/interfaces';
import { setupEmailVerification } from '../send-email';

// Verify can not be done via GraphQL because it will be a hyperlink in the
// email they receive
export function getAuthResolvers(config: AuthModuleConfig) {
  const verificationEmail = setupEmailVerification(config.email);
  const registerConfig = { ...config.register, verificationEmail };
  return {
    authResolvers: {
      Mutation: {
        login: loginResolver(config.login),
        register: registerResolver(registerConfig)
      }
    }
  };
}

/**
 *  A function that handles logging a user in
 *
 * @returns { Object } A User and signed JWT.
 */
export function loginResolver(
  config: LoginControllerConfig
): GraphQLFieldResolver<any, { username: string; password: string }, any> {
  const loginController = setupLoginController(config);

  return function login(root, args, ctx, i): Promise<{ token: string }> {
    const username: string = args.username;
    const password: string = args.password;

    return loginController(username, password);
  };
}

export function registerResolver(
  config: RegistrationControllerConfig
): GraphQLFieldResolver<any, { input: IUser }, any> {
  const registerController = setupRegisterController(config);
  return function register(root, args, ctx, i) {
    return registerController(args.input);
  };
}
