// UQT_UPDATE -> Delete this file

import { GraphQLFieldResolver } from 'graphql';
import {
  demoSetupLoginController,
  demoSetupRegisterController
} from './demo.controllers';
import {
  DemoRegistrationControllerConfig,
  DemoAuthModuleConfig
} from './demo.interface';
import { IUser } from '@uqt/data';
import { LoginControllerConfig } from '../auth.interface';

// Verify can not be done via GraphQL because it will be a hyperlink in the
export function getDemoAuthResolvers(config: DemoAuthModuleConfig) {
  return {
    Mutation: {
      login: loginResolver(config.login),
      register: registerResolver(config.register)
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
  const loginController = demoSetupLoginController(config);

  return function login(root, args, ctx, i): Promise<{ token: string }> {
    const username: string = args.username;
    const password: string = args.password;

    return loginController(username, password);
  };
}

export function registerResolver(
  config: DemoRegistrationControllerConfig
): GraphQLFieldResolver<any, { input: IUser }, any> {
  const registerController = demoSetupRegisterController(config);
  return function register(root, args, ctx, i) {
    return registerController(args.input);
  };
}
