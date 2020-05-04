import { IUserModel } from '@ztp/server/core-data';
import { ServerAuthConfig } from '../auth.interface';
import { DemoAuthModuleConfig } from './demo.interface';
import { createPublicPemFromPrivate } from '../auth-utils';

export function generateDemoAuthModuleConfig(
  User: IUserModel,
  config: ServerAuthConfig
): DemoAuthModuleConfig {
  const { publicKey, privateKey } = config.accessToken;
  return {
    jwks: config.jwksRoute
      ? {
          publicKey: publicKey
            ? publicKey
            : createPublicPemFromPrivate(privateKey),
          keyId: config.accessToken.keyId,
        }
      : undefined,
    login: { User, ...config.accessToken },
    register: { User, ...config.accessToken },
  };
}
