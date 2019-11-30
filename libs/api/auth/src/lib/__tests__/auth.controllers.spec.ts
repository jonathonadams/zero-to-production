import {
  IUser,
  IUserModel,
  IRefreshTokenModel,
  IVerificationToken,
  IVerificationTokenModel
} from '@uqt/types';
import { AuthenticationRoles } from '@uqt/enums';
import mongoose from 'mongoose';

import {
  registerController,
  loginController,
  authorizeController,
  refreshAccessTokenController,
  revokeRefreshTokenController,
  verifyController
} from '../auth.controllers';
import { MockUserModel } from './user.mock.spec';

import { hash } from 'bcryptjs';
import { MockRefreshTokenModel } from './refresh-token.mock.spec';
import { signRefreshToken } from '../auth.utils';
import {
  MockVerificationToken,
  mockSendVerificationEmail
} from './verification.mock.spec';

export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}

const userToRegister = ({
  username: 'uniqueUsername',
  firstName: 'test',
  lastName: 'user',
  emailAddress: 'unique@email.com',
  dateOfBirth: new Date(),
  hashedPassword: 'asF.s0f.s',
  role: AuthenticationRoles.User,
  active: true,
  isValid: false,
  settings: {
    darkMode: false,
    colors: {
      lightPrimary: '',
      lightAccent: '',
      darkPrimary: '',
      darkAccent: ''
    }
  }
} as any) as IUser;

const userWithPassword = ({
  ...userToRegister,
  password: 'asF.s0f.s123123'
} as any) as IUser;

describe(`Authentication Controllers`, () => {
  describe('register', () => {
    it('should register a new user', async () => {
      MockUserModel.userToRespondWith = null;

      const createdUser = await registerController(
        (MockUserModel as unknown) as IUserModel,
        (MockVerificationToken as unknown) as IVerificationTokenModel,
        jest.fn()
      )({ ...userWithPassword });

      expect(createdUser).toBeTruthy();
      expect(createdUser.id).toBeDefined();

      MockUserModel.reset();
      MockVerificationToken.reset();
    });

    it('should send a verification email the users email', async () => {
      MockUserModel.userToRespondWith = null;

      const spy = jest.fn();

      const createdUser = await registerController(
        (MockUserModel as unknown) as IUserModel,
        (MockVerificationToken as unknown) as IVerificationTokenModel,
        spy
      )({ ...userWithPassword });

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toBe(createdUser.email);

      MockUserModel.reset();
      MockVerificationToken.reset();
    });

    it('should not return the password or hashed password if successful', async () => {
      MockUserModel.userToRespondWith = null;

      const createdUser = await registerController(
        (MockUserModel as unknown) as IUserModel,
        (MockVerificationToken as unknown) as IVerificationTokenModel,
        mockSendVerificationEmail
      )({ ...userWithPassword });

      expect((createdUser as any).password).not.toBeDefined();
      expect((createdUser as any).hashedPassword).not.toBeDefined();

      MockUserModel.reset();
      MockVerificationToken.reset();
    });

    it('should not not allow a user to register if the username is taken', async () => {
      const userWithUniqueDetails = ({
        ...userWithPassword,
        username: 'anotherUsername',
        emailAddress: 'anotherUnique@email.com'
      } as any) as IUser;

      MockUserModel.userToRespondWith = null;

      await expect(
        registerController(
          (MockUserModel as unknown) as IUserModel,
          (MockVerificationToken as unknown) as IVerificationTokenModel,
          mockSendVerificationEmail
        )(userWithUniqueDetails)
      ).resolves.not.toThrowError();

      MockUserModel.userToRespondWith = userWithUniqueDetails;

      await expect(
        registerController(
          (MockUserModel as unknown) as IUserModel,
          (MockVerificationToken as unknown) as IVerificationTokenModel,
          mockSendVerificationEmail
        )(userWithUniqueDetails)
      ).rejects.toThrowError('Username is not available');

      MockUserModel.reset();
      MockVerificationToken.reset();
    });
  });

  describe('verify', () => {
    it('should verify a users email', async () => {
      const userId = '1';
      const token = 'SOME-TOKEN';

      const setMock = jest.fn();
      const removeMock = jest.fn();
      MockUserModel.userToRespondWith = {
        id: userId,
        ...userToRegister,
        ...{ set: setMock, save: jest.fn() }
      };
      MockVerificationToken.tokenToRespondWith = {
        token,
        userId,
        ...{ remove: removeMock }
      };

      expect((MockUserModel._user as IUser).isValid).toBe(false);

      const message = await verifyController(
        (MockUserModel as unknown) as IUserModel,
        (MockVerificationToken as unknown) as IVerificationTokenModel
      )(userToRegister.email, token);

      expect(setMock).toHaveBeenCalled();
      expect(setMock.mock.calls[0][0]).toEqual({ isValid: true });
      expect(removeMock).toHaveBeenCalled();

      MockVerificationToken.reset();
      MockUserModel.reset();
    });

    it('should throw if a user cannot be found', async () => {
      const token = 'SOME-TOKEN';
      MockUserModel.userToRespondWith = null;

      await expect(
        verifyController(
          (MockUserModel as unknown) as IUserModel,
          (MockVerificationToken as unknown) as IVerificationTokenModel
        )(userToRegister.email, token)
      ).rejects.toThrowError('Email address is not available');

      MockVerificationToken.reset();
      MockUserModel.reset();
    });

    it('should throw if the user is already valid', async () => {
      const token = 'SOME-TOKEN';

      MockUserModel.userToRespondWith = {
        ...userToRegister,
        isValid: true
      };

      await expect(
        verifyController(
          (MockUserModel as unknown) as IUserModel,
          (MockVerificationToken as unknown) as IVerificationTokenModel
        )(userToRegister.email, token)
      ).rejects.toThrowError('User is already registered');

      MockVerificationToken.reset();
      MockUserModel.reset();
    });

    it('should throw if the token is not valid', async () => {
      const token = 'SOME-TOKEN';

      MockUserModel.userToRespondWith = { ...userToRegister };
      MockVerificationToken.tokenToRespondWith = null;

      await expect(
        verifyController(
          (MockUserModel as unknown) as IUserModel,
          (MockVerificationToken as unknown) as IVerificationTokenModel
        )(userToRegister.email, token)
      ).rejects.toThrowError('Token is not valid');

      MockVerificationToken.reset();
      MockUserModel.reset();
    });

    it('should throw if the token does not belong to the user', async () => {
      const token = 'SOME-TOKEN';

      const setMock = jest.fn();
      const removeMock = jest.fn();
      MockUserModel.userToRespondWith = {
        id: '1',
        ...userToRegister
      };
      MockVerificationToken.tokenToRespondWith = {
        token,
        userId: '2'
      };

      await expect(
        verifyController(
          (MockUserModel as unknown) as IUserModel,
          (MockVerificationToken as unknown) as IVerificationTokenModel
        )(userToRegister.email, token)
      ).rejects.toThrowError('Token does not match email address');

      MockVerificationToken.reset();
      MockUserModel.reset();
    });
  });

  describe('login', () => {
    it('should return an access token if correct credentials are provided', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };

      // Set the hashed password to be correct
      userWithId.hashedPassword = await hash((userWithId as any).password, 10);

      MockUserModel.userToRespondWith = userWithId;

      const { token } = await loginController({
        userModel: (MockUserModel as unknown) as IUserModel,
        secret: 'some secret',
        expireTime: 100000
      })(userWithId.username, (userWithId as any).password);

      expect(token).toBeDefined();
      expect(token).toBeString();

      MockUserModel.reset();
    });

    it('should throw unauthorized errors if the credentials are incorrect', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };

      // Set the hashed password to be correct
      userWithId.hashedPassword = await hash((userWithId as any).password, 10);

      MockUserModel.userToRespondWith = userWithId;

      await expect(
        loginController({
          userModel: (MockUserModel as unknown) as IUserModel,
          secret: 'some secret',
          expireTime: 100000
        })(userWithId.username, 'somWrongPassword')
      ).rejects.toThrowError('Unauthorized');

      await expect(
        loginController({
          userModel: (MockUserModel as unknown) as IUserModel,
          secret: 'some secret',
          expireTime: 100000
        })('someWrongUsername', (userWithId as any).password)
      ).rejects.toThrowError('Unauthorized');
    });

    it('should throw an unauthorized error if the user is not active', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };

      // Set the hashed password to be correct
      userWithId.hashedPassword = await hash((userWithId as any).password, 10);

      const inactiveUser = {
        ...userWithId,
        active: false
      };
      MockUserModel.userToRespondWith = inactiveUser;

      await expect(
        loginController({
          userModel: (MockUserModel as unknown) as IUserModel,
          secret: 'some secret',
          expireTime: 100000
        })(userWithId.username, (userWithId as any).password)
      ).rejects.toThrowError('Unauthorized');
    });
  });

  describe('authorize', () => {
    it('should return an accessToken and refreshToken if the credentials correct', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };

      // Set the hashed password to be correct
      userWithId.hashedPassword = await hash((userWithId as any).password, 10);

      MockUserModel.userToRespondWith = userWithId;

      const { token, refreshToken } = await authorizeController({
        userModel: (MockUserModel as unknown) as IUserModel,
        accessTokenSecret: 'some secret',
        refreshTokenSecret: 'refreshSecret',
        accessTokenExpireTime: 100000,
        refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
      })(userWithId.username, (userWithId as any).password);

      expect(token).toBeDefined();
      expect(token).toBeString();
      expect(refreshToken).toBeDefined();
      expect(refreshToken).toBeString();

      MockUserModel.reset();
      MockRefreshTokenModel.reset();
    });

    it('should throw unauthorized errors if the credentials are incorrect', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };

      // Set the hashed password to be correct
      userWithId.hashedPassword = await hash((userWithId as any).password, 10);

      MockUserModel.userToRespondWith = userWithId;

      await expect(
        authorizeController({
          userModel: (MockUserModel as unknown) as IUserModel,
          accessTokenSecret: 'some secret',
          refreshTokenSecret: 'refreshSecret',
          accessTokenExpireTime: 100000,
          refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
        })(userWithId.username, 'somWrongPassword')
      ).rejects.toThrowError('Unauthorized');

      await expect(
        authorizeController({
          userModel: (MockUserModel as unknown) as IUserModel,
          accessTokenSecret: 'some secret',
          refreshTokenSecret: 'refreshSecret',
          accessTokenExpireTime: 100000,
          refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
        })('someWrongUsername', (userWithId as any).password)
      ).rejects.toThrowError('Unauthorized');
    });

    it('should throw an unauthorized error if the user is not active', async () => {
      const inactiveUser = {
        ...userWithPassword,
        id: newId(),
        active: false
      };

      // Set the hashed password to be correct
      inactiveUser.hashedPassword = await hash(
        (inactiveUser as any).password,
        10
      );

      MockUserModel.userToRespondWith = inactiveUser;

      await expect(
        authorizeController({
          userModel: (MockUserModel as unknown) as IUserModel,
          accessTokenSecret: 'some secret',
          refreshTokenSecret: 'refreshSecret',
          accessTokenExpireTime: 100000,
          refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
        })(inactiveUser.username, (inactiveUser as any).password)
      ).rejects.toThrowError('Unauthorized');

      MockUserModel.reset();
      MockRefreshTokenModel.reset();
    });
  });

  describe('refreshAccessToken', () => {
    it('should return a new access token when the a valid refresh token is provided', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };
      const refreshSecret = 'some-super-secret-secret';

      const refreshTokenString = signRefreshToken({ secret: refreshSecret })(
        userWithId
      );

      const refreshToken = await MockRefreshTokenModel.create({
        user: {
          id: userWithId.id,
          username: userWithId.username
        } as IUser,
        token: refreshTokenString
      });

      MockRefreshTokenModel.findByTokenWithUserResponse = refreshToken.toJSON();

      const { token } = await refreshAccessTokenController({
        accessTokenSecret: 'some secret',
        refreshTokenSecret: refreshSecret,
        accessTokenExpireTime: 100000,
        refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
      })(userWithId.username, refreshToken.toJSON().token);

      expect(token).toBeDefined();
      expect(token).toBeString();

      MockUserModel.reset();
      MockRefreshTokenModel.reset();
    });

    it('should throw a unauthorized errors if invalid username or token provided', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };
      const refreshSecret = 'some-super-secret-secret';

      const refreshTokenString = signRefreshToken({ secret: refreshSecret })(
        userWithId
      );

      const refreshToken = await MockRefreshTokenModel.create({
        user: {
          id: userWithId.id,
          username: userWithId.username
        } as IUser,
        token: refreshTokenString
      });

      MockRefreshTokenModel.findByTokenWithUserResponse = refreshToken.toJSON();

      await expect(
        refreshAccessTokenController({
          accessTokenSecret: 'some secret',
          refreshTokenSecret: refreshSecret,
          accessTokenExpireTime: 100000,
          refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
        })(userWithId.username, 'incorrect token')
      ).rejects.toThrowError('Unauthorized');

      await expect(
        refreshAccessTokenController({
          accessTokenSecret: 'some secret',
          refreshTokenSecret: refreshSecret,
          accessTokenExpireTime: 100000,
          refreshTokenModel: (MockRefreshTokenModel as unknown) as IRefreshTokenModel
        })('incorrect username', refreshToken.toJSON().token)
      ).rejects.toThrowError('Unauthorized');

      MockUserModel.reset();
      MockRefreshTokenModel.reset();
    });
  });

  describe('revokeRefreshToken', () => {
    it('should revoke the refresh token provided', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };
      const refreshSecret = 'some-super-secret-secret';

      const refreshTokenString = signRefreshToken({ secret: refreshSecret })(
        userWithId
      );

      const refreshToken = await MockRefreshTokenModel.create({
        user: {
          id: userWithId.id,
          username: userWithId.username
        } as IUser,
        token: refreshTokenString
      });

      MockRefreshTokenModel.findByTokenWithUserResponse = refreshToken.toJSON();

      const { success } = await revokeRefreshTokenController(
        /* RefreshTokenModel*/ (MockRefreshTokenModel as unknown) as IRefreshTokenModel
      )(refreshToken.toJSON().token);

      expect(success).toBe(true);

      MockUserModel.reset();
      MockRefreshTokenModel.reset();
    });

    it('should throw a bad request if the token can not be found', async () => {
      const userWithId = {
        ...userWithPassword,
        id: newId()
      };
      const refreshSecret = 'some-super-secret-secret';

      const refreshTokenString = signRefreshToken({ secret: refreshSecret })(
        userWithId
      );

      const refreshToken = await MockRefreshTokenModel.create({
        user: {
          id: userWithId.id,
          username: userWithId.username
        } as IUser,
        token: refreshTokenString
      });

      MockRefreshTokenModel.findByTokenWithUserResponse = refreshToken.toJSON();

      await expect(
        revokeRefreshTokenController(
          /* RefreshTokenModel*/ (MockRefreshTokenModel as unknown) as IRefreshTokenModel
        )('THIS IS NOT THE CORRECT TOKEN')
      ).rejects.toThrowError('Bad Request');

      MockUserModel.reset();
      MockRefreshTokenModel.reset();
    });
  });
});
