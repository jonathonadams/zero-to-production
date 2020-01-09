import { randomBytes } from 'crypto';
import { verify } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import Boom from '@hapi/boom';
import {
  signAccessToken,
  signRefreshToken,
  isPasswordAllowed,
  userToJSON
} from './auth-utils';
import { IUserModel } from '@uqt/api/core-data';
import { IVerificationTokenModel, IRefreshTokenModel } from './auth.interface';
import { IUser } from '@uqt/interfaces';
// TODO -> Refresh Token Model/Storage

export function registerController(
  User: IUserModel,
  VerificationToken: IVerificationTokenModel,
  sendVerificationEmail: (to: string, token: string) => Promise<[any, {}]>
) {
  return async function registerCtr(user: IUser): Promise<IUser> {
    const password: string = (user as any).password;
    if (!password) Boom.badRequest('No password provided');

    if (!isPasswordAllowed(password))
      throw Boom.badRequest('Password does not meet requirements');

    const currentUser = await User.findByUsername(user.username);
    if (currentUser !== null)
      throw Boom.badRequest('Username is not available');

    user.hashedPassword = await hash(password, 10);

    const newUser = new User({ ...user, isValid: false, active: true });
    await newUser.save();

    const verificationToken = new VerificationToken({
      userId: newUser.id,
      token: randomBytes(16).toString('hex')
    });

    await await verificationToken.save();
    await sendVerificationEmail(user.email, verificationToken.token);

    return userToJSON(newUser.toJSON());
  };
}

/**
 *
 *
 * @export
 * @param {IUserModel} User
 * @param {IVerificationTokenModel} VerificationToken
 * @returns Verification Controller
 */
export function verifyController(
  User: IUserModel,
  VerificationToken: IVerificationTokenModel
) {
  return async function verifyCtr(
    email: string,
    token: string
  ): Promise<{ message: string }> {
    /**
     * Check the user exists and is not already registered
     */
    const user = await User.findOne({ email }).exec();

    if (!user) throw Boom.badRequest('Email address is not available');
    if (user.isValid) throw Boom.badRequest('User is already registered');

    /**
     * Check the provided Token is valid
     */
    const verificationToken = await VerificationToken.findOne({ token }).exec();
    if (!verificationToken) throw Boom.badRequest('Token is not valid');

    /**
     * Is the provided token and email a match
     */
    if (verificationToken.userId.toString() !== user.id.toString())
      throw Boom.badRequest('Token does not match email address');

    user.set({ isValid: true });
    /**
     * Update the user status to valid, and remove the token from the db.
     */
    await Promise.all([user.save(), verificationToken.remove()]);

    return { message: `User with ${user.email} has been verified` };
  };
}

/**
 *  A function that handles logging a user in
 *
 * @export
 * @param {{
 *   userModel: IUserModel;
 *   secret: string;
 *   expireTime: number;
 * }} {
 *   userModel,
 *   secret,
 *   expireTime
 * }
 */
export function loginController({
  userModel,
  accessTokenPrivateKey,
  expireTime
}: {
  userModel: IUserModel;
  accessTokenPrivateKey: string;
  expireTime: number;
}) {
  const accessToken = signAccessToken({
    accessTokenPrivateKey,
    expireTime
  });

  return async function loginCtr(
    username: string,
    password: string
  ): Promise<{ token: string }> {
    const user = await userModel.findByUsername(username);

    if (!user || !user.active) throw Boom.unauthorized(null, 'Bearer');

    const valid = await compare(password, user.hashedPassword as string);

    if (!valid) throw Boom.unauthorized(null, 'Bearer');

    const token = accessToken(user);

    return {
      token
    };
  };
}

export function authorizeController({
  userModel,
  refreshTokenModel,
  accessTokenPrivateKey,
  accessTokenExpireTime,
  refreshTokenPrivateKey
}: {
  userModel: IUserModel;
  refreshTokenModel: IRefreshTokenModel;
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
}) {
  return async function authorizeCtr(
    username: string,
    password: string
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await userModel.findByUsername(username);

    if (!user || user.active === false) throw Boom.unauthorized(null, 'Bearer');

    const valid = await compare(password, user.hashedPassword as string);

    if (!valid) throw Boom.unauthorized(null, 'Bearer');

    const accessToken = signAccessToken({
      accessTokenPrivateKey,
      expireTime: accessTokenExpireTime
    })(user);

    const refreshToken = signRefreshToken({
      refreshTokenPrivateKey
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
  accessTokenPrivateKey,
  accessTokenExpireTime,
  refreshTokenPrivateKey
}: {
  refreshTokenModel: IRefreshTokenModel;
  accessTokenPrivateKey: string;
  accessTokenExpireTime: number;
  refreshTokenPrivateKey: string;
}) {
  return async function refreshAccessTokenCt(
    username: string,
    refreshToken: string
  ): Promise<{ token: string }> {
    const token = await refreshTokenModel.findByTokenWithUser(refreshToken);
    // No token found
    if (token === null) throw Boom.unauthorized(null, 'Bearer');

    // No user found or matched with given parameters
    if (token.user === null || token.user.username !== username)
      throw Boom.unauthorized(null, 'Bearer');

    // revoke refreshToken if user is inactive
    if (token.user.active === false) {
      await token.remove();
      throw Boom.unauthorized(null, 'Bearer');
    }

    // The provided token is valid
    const valid = await verify(refreshToken, refreshTokenPrivateKey);
    if (!valid) throw Boom.unauthorized(null, 'Bearer');

    const accessToken = signAccessToken({
      accessTokenPrivateKey,
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

    if (refreshToken === null) throw Boom.badRequest();

    await refreshToken.remove();

    return { success: true };
  };
}
