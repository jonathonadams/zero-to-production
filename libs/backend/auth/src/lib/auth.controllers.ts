import { verify } from 'jsonwebtoken';
import { unauthorized, badRequest } from '@hapi/boom';
import { compare, hash } from 'bcryptjs';
import { isPasswordAllowed, userToJSON } from '@workspace/shared/utils/auth';
import {
  IUser,
  IUserModel,
  IRefreshTokenModel
} from '@workspace/shared/interfaces';
import { signAccessToken, signRefreshToken } from './auth';

// TODO -> Refresh Token Model/Storage

export function registerController(User: IUserModel) {
  return async function registerCtr(user: IUser): Promise<IUser> {
    const password: string = (user as any).password;
    if (!password) badRequest('No password provided');

    if (!isPasswordAllowed(password))
      throw badRequest('Password does not match requirements');

    const currentUser = await User.findByUsername(user.username);
    if (currentUser !== null) throw badRequest('Username is not available');

    user.hashedPassword = await hash(password, 10);

    const newUser = new User({ ...user });
    await newUser.save();

    return userToJSON(newUser.toJSON());
  };
}

/**
 *  A function that handles logging a user in
 *
 * @returns { Object } A User and signed JWT.
 */
export function loginController({
  userModel,
  secret,
  expireTime
}: {
  userModel: IUserModel;
  secret: string;
  expireTime: number;
}) {
  const accessToken = signAccessToken({
    secret,
    expireTime
  });

  return async function loginCtr(
    username: string,
    password: string
  ): Promise<{ token: string }> {
    const user = await userModel.findByUsername(username);

    if (!user || user.active === false) throw unauthorized('Unauthorized');

    const valid = await compare(password, user.hashedPassword as string);

    if (!valid) throw unauthorized('Unauthorized');

    const token = accessToken(user);

    return {
      token
    };
  };
}

export function authorizeController({
  userModel,
  refreshTokenModel,
  accessTokenSecret,
  accessTokenExpireTime,
  refreshTokenSecret
}: {
  userModel: IUserModel;
  refreshTokenModel: IRefreshTokenModel;
  accessTokenSecret: string;
  accessTokenExpireTime: number;
  refreshTokenSecret: string;
}) {
  return async function authorizeCtr(
    username: string,
    password: string
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await userModel.findByUsername(username);

    if (!user || user.active === false) throw unauthorized('Unauthorized');

    const valid = await compare(password, user.hashedPassword as string);

    if (!valid) throw unauthorized('Unauthorized');

    const accessToken = signAccessToken({
      secret: accessTokenSecret,
      expireTime: accessTokenExpireTime
    })(user);

    const refreshToken = signRefreshToken({
      secret: refreshTokenSecret
    })(user);

    await refreshTokenModel.create({
      user: user.id,
      token: refreshToken
    });

    return {
      token: accessToken,
      refreshToken: refreshToken
    };
  };
}

// a controller that receives a refresh token and returns an access token.
export function refreshAccessTokenController({
  refreshTokenModel,
  accessTokenSecret,
  accessTokenExpireTime,
  refreshTokenSecret
}: {
  refreshTokenModel: IRefreshTokenModel;
  accessTokenSecret: string;
  accessTokenExpireTime: number;
  refreshTokenSecret: string;
}) {
  return async function refreshAccessTokenCt(
    username: string,
    refreshToken: string
  ): Promise<{ token: string }> {
    const token = await refreshTokenModel.findByTokenWithUser(refreshToken);
    // No token found
    if (token === null) throw unauthorized();

    // No user found or matched with given parameters
    if (token.user === null || token.user.username !== username)
      throw unauthorized();

    // revoke refreshToken if user is inactive
    if (token.user.active === false) {
      await token.remove();
      throw unauthorized();
    }

    // The provided token is valid
    const valid = await verify(refreshToken, refreshTokenSecret);
    if (!valid) throw unauthorized();

    const accessToken = signAccessToken({
      secret: accessTokenSecret,
      expireTime: accessTokenExpireTime
    })(token.user);

    return {
      token: accessToken
    };
  };
}

// a controller to revoke a refresh token
export function revokeRefreshTokenController(
  refreshTokenMode: IRefreshTokenModel
) {
  return async function revokeRFController(
    token: string
  ): Promise<{ success: true }> {
    const refreshToken = await refreshTokenMode.findOne({ token }).exec();

    if (refreshToken === null) throw badRequest();

    await refreshToken.remove();

    return { success: true };
  };
}
