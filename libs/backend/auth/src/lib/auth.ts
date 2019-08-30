import Koa from 'koa';
import Router from 'koa-router';
import {
  IUserModel,
  IRefreshTokenModel,
  IVerificationTokenModel
} from '@ngw/shared/interfaces';
import { AuthenticationRoles } from '@ngw/shared/enums';
import {
  login,
  register,
  authorize,
  refreshAccessToken,
  revokeRefreshToken,
  verify
} from './auth.routes';
import { verifyToken, verifyUserIsActive } from './rest.guards';
import { checkToken, checkUserIsActive, checkUserRole } from './graphql.guards';
import { authenticateRequest } from './auth.graphql';
import { loginResolver, registerResolver } from './auth.resolvers';
import { verificationEmail } from './send-email';

export interface AuthRouteOptions {
  userLogin?: boolean;
  userRegistration?: boolean;
  refreshTokens?: boolean;
}

export interface AuthModels {
  userModel: IUserModel;
  verificationModel?: IVerificationTokenModel;
  refreshTokenModel?: IRefreshTokenModel;
}

export interface AuthRoutesConfig {
  accessTokenSecret: string;
  accessTokenExpireTime: number;
  refreshTokenSecret?: string;
  SENDGRID_API_KEY?: string;
  hostUrl?: string;
}

// TODO -> Best way to deal with Refresh Tokens this? attach to user?, Separate model?

// export class AuthModule {
export function getRestGuards(
  userModel: IUserModel,
  accessTokenSecret: string
) {
  return {
    verifyToken: verifyToken(accessTokenSecret),
    verifyUserIsActive: verifyUserIsActive(userModel)
  };
}

export function getGraphQlGuards(
  userModel: IUserModel,
  accessTokenSecret: string
) {
  // export the below array to use in the authenticate request function.
  const verifyTokenM = [checkToken(accessTokenSecret)];
  const verifyUserIsActiveM = [...verifyTokenM, checkUserIsActive(userModel)];

  return {
    verifyToken: authenticateRequest(verifyTokenM),
    verifyUserIsActive: authenticateRequest(verifyUserIsActiveM),
    verifyUserRole(role: AuthenticationRoles) {
      return authenticateRequest([...verifyUserIsActiveM, checkUserRole(role)]);
    }
  };
}

export function getAuthResolvers(
  userModel: IUserModel,
  verificationModel: IVerificationTokenModel
) {
  return function authConfig(
    accessTokenSecret: string,
    accessTokenExpireTime: number,
    SENDGRID_API_KEY: string,
    hostUrl: string
  ) {
    return {
      authResolvers: {
        Mutation: {
          login: loginResolver({
            userModel,
            secret: accessTokenSecret,
            expireTime: accessTokenExpireTime
          }),
          register: registerResolver(
            userModel,
            verificationModel,
            verificationEmail(SENDGRID_API_KEY, hostUrl)
          )
        }
      }
    };
  };
}

/**
 * This will register 5 routes for authentication
 *
 * '/authorize/login' -> return access token only when user logs in
 * '/authorize/register' -> return access token when user successfully registers
 * '/authorize/verify' -> verify the newly registered user (via email)
 * '/authorize' -> returns an access token and refresh token.
 * '/authorize/token' -> returns a new access token from a valid refresh token
 * '/authorize/token/revoke' -> revokes the provided refresh token.
 */

export function applyAuthorizationRoutes({
  userLogin = false,
  userRegistration = false,
  refreshTokens = false
}: AuthRouteOptions) {
  return function authRouteModels(models: AuthModels) {
    if (userLogin && !checkLoginModels(models)) {
      // TODO -> Handle exit
    }
    if (userRegistration && !checkRegistrationModels(models)) {
      // TODO -> Handle exit
    }
    if (refreshTokens && !checkRefreshTokenModels(models)) {
      // TODO -> Handle exit
    }

    return function authRouteConfig(config: AuthRoutesConfig) {
      if (userLogin && !checkLoginConfig(config)) {
        // TODO -> Handle exit
      }
      if (userRegistration && !checkRegistrationConfig(config)) {
        // TODO -> Handle exit
      }
      if (refreshTokens && !checkRefreshTokenConfig(config)) {
        // TODO -> Handle exit
      }

      return function applyRoutes(app: Koa) {
        if (userLogin) {
          applyLoginRoutes(models.userModel)(
            config.accessTokenSecret,
            config.accessTokenExpireTime
          )(app);
        }

        if (userRegistration) {
          applyRegistrationRoutes(
            models.userModel,
            models.verificationModel as IVerificationTokenModel
          )(config.SENDGRID_API_KEY as string, config.hostUrl as string)(app);
        }
        if (refreshTokens) {
          applyRefreshTokenRoutes(
            models.userModel,
            models.refreshTokenModel as IRefreshTokenModel
          )(
            config.accessTokenSecret,
            config.accessTokenExpireTime,
            config.refreshTokenSecret as string
          )(app);
        }

        return true;
      };
    };
  };
}

function applyLoginRoutes(userModel: IUserModel) {
  return function loginConfig(
    accessTokenSecret: string,
    accessTokenExpireTime: number
  ) {
    return function loginRoutes(app: Koa) {
      const router = new Router();
      const config = {
        userModel: userModel,
        secret: accessTokenSecret,
        expireTime: accessTokenExpireTime
      };

      router.post('/authorize/login', login(config));

      return app.use(router.routes());
    };
  };
}

function applyRegistrationRoutes(
  userModel: IUserModel,
  verificationModel: IVerificationTokenModel
) {
  return function registrationConfig(
    SENDGRID_API_KEY: string,
    hostUrl: string
  ) {
    return function registrationRoutes(app: Koa) {
      const router = new Router();
      router.post(
        '/authorize/register',
        register(
          userModel,
          verificationModel,
          verificationEmail(SENDGRID_API_KEY, hostUrl)
        )
      );

      router.get('/authorize/verify', verify(userModel, verificationModel));

      return app.use(router.routes());
    };
  };
}

function applyRefreshTokenRoutes(
  userModel: IUserModel,
  refreshTokenModel: IRefreshTokenModel
) {
  return function refreshTokenConfig(
    accessTokenSecret: string,
    accessTokenExpireTime: number,
    refreshTokenSecret: string
  ) {
    return function refreshTokenRoutes(app: Koa) {
      const router = new Router();

      const authorizeConfig = {
        userModel: userModel,
        refreshTokenModel: refreshTokenModel,
        accessTokenSecret: accessTokenSecret,
        accessTokenExpireTime: accessTokenExpireTime,
        refreshTokenSecret: refreshTokenSecret
      };

      router.post('/authorize', authorize(authorizeConfig));
      router.post('/authorize/token', refreshAccessToken(authorizeConfig));
      router.post(
        '/authorize/token/revoke',
        revokeRefreshToken(refreshTokenModel)
      );

      return app.use(router.routes());
    };
  };
}

function checkLoginModels({ userModel }: AuthModels) {
  // TODO Process exit?
  if (!userModel) return false;
  return true;
}

function checkLoginConfig({
  accessTokenSecret,
  accessTokenExpireTime
}: AuthRoutesConfig) {
  // TODO Process exit?
  if (!accessTokenSecret || !accessTokenExpireTime) return false;
  return true;
}

function checkRegistrationModels({ userModel, verificationModel }: AuthModels) {
  // TODO Process exit?
  if (!userModel || !verificationModel) return false;
  return true;
}

function checkRegistrationConfig({
  SENDGRID_API_KEY,
  hostUrl
}: AuthRoutesConfig) {
  // TODO Process exit?
  if (!SENDGRID_API_KEY || !hostUrl) return false;
  return true;
}

function checkRefreshTokenModels({ userModel, refreshTokenModel }: AuthModels) {
  // TODO Process exit?
  if (!userModel || !refreshTokenModel) return false;
  return true;
}

function checkRefreshTokenConfig({
  accessTokenSecret,
  accessTokenExpireTime,
  refreshTokenSecret
}: AuthRoutesConfig) {
  // TODO Process exit?
  if (!accessTokenSecret || !accessTokenExpireTime || !refreshTokenSecret)
    return false;
  return true;
}
