import { GraphQLFieldResolver } from 'graphql';
import { IResolvers } from 'apollo-server-koa';
import {
  setupRegisterController,
  setupVerifyController,
  setupAuthorizeController,
} from '../core';
import {
  AuthUser,
  VerifyController,
  AuthorizeController,
  AuthModuleConfig,
  RegisterController,
} from '../types';

export type TResolver = GraphQLFieldResolver<any, any, any>;

export interface AuthResolvers extends IResolvers {
  Query: {
    verify: TResolver;
  };
  Mutation: {
    authorize: TResolver;
    register: TResolver;
  };
}

export function getAuthResolvers(config: AuthModuleConfig): AuthResolvers {
  const { register, verify, authorize } = config;

  return {
    Query: {
      verify: verifyResolver(verify),
    },
    Mutation: {
      authorize: authorizeResolver(authorize),
      register: registerResolver(register),
    },
  };
}

export function registerResolver(
  config: RegisterController
): GraphQLFieldResolver<any, { input: AuthUser }, any> {
  const registerController = setupRegisterController(config);
  return function register(root, args, ctx, i) {
    return registerController(args.input);
  };
}

export function verifyResolver(
  config: VerifyController
): GraphQLFieldResolver<any, { email: string; token: string }, any> {
  const verifyController = setupVerifyController(config);

  return function verify(root, args, ctx, i): Promise<{ message: string }> {
    const email: string = args.email;
    const token: string = args.token;

    return verifyController(email, token);
  };
}

export function authorizeResolver(
  config: AuthorizeController
): GraphQLFieldResolver<
  any,
  { email: string; token: string; cookies: any },
  any
> {
  const authorizeController = setupAuthorizeController(config);

  return (root, args, ctx, i) => {
    const username: string = args.username;
    const password: string = args.password;

    return authorizeController(username, password, ctx.cookies);
  };
}
