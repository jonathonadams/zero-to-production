// UQT_UPDATE -> Delete this file

import { IUserModel } from '@uqt/server/core-data';
import { JWKSRouteConfig, LoginControllerConfig } from '../auth.interface';

export interface DemoAuthModuleConfig {
  jwks?: JWKSRouteConfig;
  login: LoginControllerConfig;
  register: DemoRegistrationControllerConfig; // This is the same as verify because setting up the SendGrid email happens in the controller
}

// -------------------------------------
// Interfaces for each controller
// -------------------------------------
export interface DemoRegistrationControllerConfig {
  User: IUserModel;
}
