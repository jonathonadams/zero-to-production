import Koa from 'koa';
import Router from 'koa-router';
import { IUserModel, IRefreshTokenModel } from '@workspace/shared/interfaces';
import {
  login,
  register,
  authorize,
  refreshAccessToken,
  revokeRefreshToken
} from './auth.routes';
import { verifyToken, verifyUserIsActive } from './rest.guards';
import { checkToken, checkUserIsActive, checkUserRole } from './graphql.guards';
import { AuthenticationRoles } from 'dist/libs/shared/enums';
import { authenticateRequest } from './auth.graphql';

export interface AuthConfig {
  userModel: IUserModel;
  accessTokenSecret: string;
  accessTokenExpireTime: number;
  refreshTokenSecret?: string;
  refreshTokenModel?: IRefreshTokenModel;
}

// TODO -> Best way to deal with this? attach to user?, Separate model?

export class AuthModule {
  _userModel: IUserModel;
  _accessTokenSecret: string;
  _accessTokenExpireTime: number;
  _refreshTokenSecret: string | undefined;
  _refreshTokenModel: IRefreshTokenModel | undefined;

  constructor({
    userModel,
    accessTokenSecret,
    accessTokenExpireTime,
    refreshTokenSecret,
    refreshTokenModel
  }: AuthConfig) {
    if (!userModel || !accessTokenSecret || !accessTokenExpireTime) {
      console.error(
        new Error('Not all authorization configuration parameters provided')
      );
    }
    this._userModel = userModel;
    this._accessTokenSecret = accessTokenSecret;
    this._accessTokenExpireTime = accessTokenExpireTime;
    this._refreshTokenSecret = refreshTokenSecret;
    this._refreshTokenModel = refreshTokenModel;
  }

  get restGuards() {
    const accessTokenSecret = this._accessTokenSecret;
    const userModel = this._userModel;

    return {
      verifyToken: verifyToken(accessTokenSecret),
      verifyUserIsActive: verifyUserIsActive(userModel)
    };
  }

  get graphQlGuards() {
    // export the below array to use in the authenticate request function.
    const verifyTokenM = [checkToken(this._accessTokenSecret)];
    const verifyUserIsActiveM = [
      ...verifyTokenM,
      checkUserIsActive(this._userModel)
    ];

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

  applyAuthorizationRoutes(app: Koa): void {
    const router = new Router();

    const loginConfig = {
      userModel: this._userModel,
      secret: this._accessTokenSecret,
      expireTime: this._accessTokenExpireTime
    };

    router.post('/authorize/login', login(loginConfig));
    router.post(
      '/authorize/register',
      register(/* user model */ this._userModel)
    );

    if (this._refreshTokenSecret && this._refreshTokenModel) {
      const authorizeConfig = {
        userModel: this._userModel,
        refreshTokenModel: this._refreshTokenModel,
        accessTokenSecret: this._accessTokenSecret,
        accessTokenExpireTime: this._accessTokenExpireTime,
        refreshTokenSecret: this._refreshTokenSecret
      };

      router.post('/authorize', authorize(authorizeConfig));
      router.post('/authorize/token', refreshAccessToken(authorizeConfig));
      router.post(
        '/authorize/token/revoke',
        revokeRefreshToken(this._refreshTokenModel)
      );
    }
    app.use(router.routes());
  }
}
