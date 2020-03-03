import { IUserModel } from '@uqt/server/core-data';
import { AuthEnvironnementConfig } from '../auth.interface';
import { DemoAuthModuleConfig } from './demo.interface';

export function generateDemoAuthModuleConfig(
  User: IUserModel,
  config: AuthEnvironnementConfig
): DemoAuthModuleConfig {
  return {
    login: { User, ...config.accessToken },
    register: { User, ...config.accessToken }
  };
}
