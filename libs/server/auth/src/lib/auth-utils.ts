// @ts-ignore
import omit from 'lodash.omit';
import {
  JWKSGuarConfig,
  GuardConfig,
  LoginAndRegisterConfig,
  AuthWithRefreshTokenConfig,
  AuthEnvironnementConfig,
  IVerificationTokenModel,
  IRefreshTokenModel,
  AuthModuleConfig
} from './auth.interface';
import { ServerConfig } from '@uqt/data';
import { IUserModel } from '@uqt/server/core-data';
import { createPublicKey } from 'crypto';

export function isPasswordAllowed(password: string): boolean {
  return (
    !!password &&
    password.length > 8 &&
    /\d/.test(password) &&
    /\D/.test(password) &&
    /[@$!%*#?&]/.test(password)
  );
}

export function userToJSON<T>(user: T): T {
  return omit(user, ['hashedPassword', 'password']);
}

export function isJWKS(
  config: JWKSGuarConfig | GuardConfig
): config is JWKSGuarConfig {
  return (config as JWKSGuarConfig).production !== undefined;
}

export function isRefreshConfig(
  config: LoginAndRegisterConfig | AuthWithRefreshTokenConfig
): config is AuthWithRefreshTokenConfig {
  return (config as AuthWithRefreshTokenConfig).authorize !== undefined;
}

export function generateAuthGuardConfig(
  config: ServerConfig,
  authConfig: AuthEnvironnementConfig,
  User: IUserModel
): GuardConfig | JWKSGuarConfig {
  if (authConfig.accessToken.publicKey) {
    // The public key is provide, so do not need a JWKS
    return {
      User,
      issuer: authConfig.accessToken.issuer,
      audience: authConfig.accessToken.audience,
      publicKey: authConfig.accessToken.publicKey
    };
  } else {
    return {
      User,
      production: config.production,
      authServerUrl: authConfig.authServerUrl,
      issuer: authConfig.accessToken.issuer,
      audience: authConfig.accessToken.audience
    };
  }
}

export function generateAuthModuleConfig(
  User: IUserModel,
  VerificationToken: IVerificationTokenModel,
  RefreshToken: IRefreshTokenModel,
  config: AuthEnvironnementConfig
): AuthModuleConfig {
  return {
    login: { User, ...config.accessToken },
    register: { User, VerificationToken, ...config.accessToken },
    verify: { User, VerificationToken, ...config.accessToken },
    authorize: {
      User,
      RefreshToken,
      ...config.accessToken,
      ...config.refreshToken
    },
    refresh: {
      RefreshToken,
      ...config.accessToken,
      ...config.refreshToken
    },
    revoke: { RefreshToken },
    email: config.email
  };
}

export function createPublicPemFromPrivate(privateKey: string) {
  const publicPem = createPublicKey(privateKey);

  return publicPem.export({ format: 'pem', type: 'spki' }) as string;
}
