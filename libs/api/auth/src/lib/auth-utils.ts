// @ts-ignore
import omit from 'lodash.omit';
import {
  JWKSGuarConfig,
  GuardConfig,
  LoginAndRegisterConfig,
  AuthWithRefreshTokenConfig
} from './auth.interface';

export function isPasswordAllowed(password: string): boolean {
  return (
    !!password &&
    password.length > 6 &&
    /\d/.test(password) &&
    /\D/.test(password)
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
