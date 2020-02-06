// UQT_UPDATE -> Delete this file

import { IUserModel } from '@uqt/server/core-data';
import { GraphQLFieldResolver } from 'graphql';

export type AuthMiddleware = GraphQLFieldResolver<any, any, any>;

export type DemoAuthModuleConfig = DemoLoginAndRegisterConfig;

export interface DemoLoginAndRegisterConfig {
  login: DemoLoginControllerConfig;
  register: DemoRegistrationControllerConfig; // This is the same as verify because setting up the SendGrid email happens in the controller
}

// -------------------------------------
// For signing access and refresh tokens
// -------------------------------------
export interface AccessTokenConfig {
  privateKey: string;
  expireTime: number;
  issuer: string;
  audience: string;
  keyId: string;
}

export interface JWKSRouteConfig {
  privateKey: string;
  keyId: string;
}

export interface JWKSGuardConfig {
  authServerUrl: string;
  production: boolean;
}

// -------------------------------------
// Interfaces for each controller
// -------------------------------------
export interface DemoLoginControllerConfig extends AccessTokenConfig {
  User: IUserModel;
}

export interface DemoRegistrationControllerConfig {
  User: IUserModel;
}

export interface DemoAvailableControllerConfig {
  User: IUserModel;
}

// -------------------------------------
// Interfaces for the Auth Guards
// -------------------------------------

export interface GuardConfig
  extends VerifyTokenConfig,
    VerifyActiveUserConfig {}

export interface JWKSGuarConfig
  extends VerifyTokenJWKSConfig,
    VerifyActiveUserConfig {}

export interface VerifyTokenJWKSConfig {
  issuer: string;
  audience: string;
  authServerUrl: string;
  production: boolean;
}

export interface VerifyTokenConfig {
  issuer: string;
  audience: string;
  publicKey: string;
}

export interface VerifyActiveUserConfig {
  User: IUserModel;
}
