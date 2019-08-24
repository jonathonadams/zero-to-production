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

// TODO -> Best way to deal with Refresh Tokens this? attach to user?, Separate model?

export class AuthModule {
  static getRestGuards(userModel: IUserModel, accessTokenSecret: string) {
    return {
      verifyToken: verifyToken(accessTokenSecret),
      verifyUserIsActive: verifyUserIsActive(userModel)
    };
  }

  static getGraphQlGuards(userModel: IUserModel, accessTokenSecret: string) {
    // export the below array to use in the authenticate request function.
    const verifyTokenM = [checkToken(accessTokenSecret)];
    const verifyUserIsActiveM = [...verifyTokenM, checkUserIsActive(userModel)];

    return {
      verifyToken: authenticateRequest(verifyTokenM),
      verifyUserIsActive: authenticateRequest(verifyUserIsActiveM),
      verifyUserRole(role: AuthenticationRoles) {
        return authenticateRequest([
          ...verifyUserIsActiveM,
          checkUserRole(role)
        ]);
      }
    };
  }

  static getAuthResolvers(
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
  static applyAuthorizationRoutes(
    userModel: IUserModel,
    verificationModel: IVerificationTokenModel,
    refreshTokenModel: IRefreshTokenModel
  ) {
    return function authConfig(
      accessTokenSecret: string,
      accessTokenExpireTime: number,
      refreshTokenSecret: string,
      SENDGRID_API_KEY: string,
      hostUrl: string
    ) {
      return function(app: Koa): void {
        const router = new Router();

        const loginConfig = {
          userModel: userModel,
          secret: accessTokenSecret,
          expireTime: accessTokenExpireTime
        };

        router.post('/authorize/login', login(loginConfig));

        router.post(
          '/authorize/register',
          register(
            userModel,
            verificationModel,
            verificationEmail(SENDGRID_API_KEY, hostUrl)
          )
        );

        router.get('/authorize/verify', verify(userModel, verificationModel));

        if (refreshTokenSecret && refreshTokenModel) {
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
        }
        app.use(router.routes());
      };
    };
  }
}
