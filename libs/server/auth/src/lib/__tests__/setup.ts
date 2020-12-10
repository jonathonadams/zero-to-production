import { MockAuthUserModel } from './user.mock';
import { MockVerifyModel } from './verification.mock';
import { privateKey, publicKey } from './rsa-keys';
import { MockRefreshModel } from './refresh-token.mock';
import {
  Verify,
  VerifyModel,
  Refresh,
  RefreshModel,
  VerifyController,
  AuthorizeController,
  RefreshController,
  RevokeController,
  AuthUser,
  AuthUserModel,
  RegisterController,
} from '../types';

export const issuer = 'some-issuer';
export const audience = 'say-hello!!!';
export const keyId = 'key-id';
export const refreshSecret = 'super-secret';

export function mockRegistrationConfig(
  email: jest.Mock<any, any> = jest.fn()
): RegisterController {
  return {
    User: (MockAuthUserModel as unknown) as AuthUserModel,
    Verify: (MockVerifyModel as unknown) as VerifyModel,
    verifyEmail: email,
  };
}

export function mockVerificationConfig(): VerifyController {
  return {
    User: (MockAuthUserModel as unknown) as AuthUserModel,
    Verify: (MockVerifyModel as unknown) as VerifyModel,
  };
}

export function mockAuthorizeConfig(): AuthorizeController {
  return {
    User: (MockAuthUserModel as unknown) as AuthUserModel,
    access: {
      expireTime: 100000,
      issuer,
      audience,
      keyId,
      privateKey,
    },
    refresh: {
      secret: refreshSecret,
      issuer,
      audience,
    },
    Refresh: (MockRefreshModel as unknown) as RefreshModel,
  };
}

export function mockRefreshTokenConfig(): RefreshController {
  return {
    access: {
      privateKey,
      audience,
      keyId,
      expireTime: 100000,
      issuer,
    },
    refresh: {
      secret: refreshSecret,
      audience,
      issuer,
    },
    Refresh: (MockRefreshModel as unknown) as RefreshModel,
  };
}

export function mockRevokeConfig(): RevokeController {
  return {
    Refresh: (MockRefreshModel as unknown) as RefreshModel,
  };
}
