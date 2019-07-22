import {
  IUser,
  IUserModel,
  IRefreshTokenModel
} from '@workspace/shared/interfaces';
import { AuthenticationRoles } from '@workspace/shared/enums';
import { newId } from '@app-testing/index';
import {
  registerController,
  loginController,
  authorizeController,
  refreshAccessTokenController,
  revokeRefreshTokenController
} from '../auth.controllers';
import { MockUserModel } from './user.mock';

import { hash } from 'bcryptjs';
import { MockRefreshTokenModel } from './refresh-token.mock';
import { signRefreshToken } from '../auth';

const userToRegister = ({
  username: 'uniqueUsername',
  firstName: 'test',
  lastName: 'user',
  emailAddress: 'unique@email.com',
  dateOfBirth: new Date(),
  hashedPassword: 'asF.s0f.s',
  role: AuthenticationRoles.User,
  active: true,
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
        (MockUserModel as unknown) as IUserModel
      )({ ...userWithPassword });

      expect(createdUser).toBeTruthy();
      expect(createdUser.id).toBeDefined();

      MockUserModel.reset();
    });

    it('should not return the password or hashed password if successful', async () => {
      MockUserModel.userToRespondWith = null;

      const createdUser = await registerController(
        (MockUserModel as unknown) as IUserModel
      )({ ...userWithPassword });

      expect((createdUser as any).password).not.toBeDefined();
      expect((createdUser as any).hashedPassword).not.toBeDefined();

      MockUserModel.reset();
    });

    it('should not not allow a user to register if the username is taken', async () => {
      const userWithUniqueDetails = ({
        ...userWithPassword,
        username: 'anotherUsername',
        emailAddress: 'anotherUnique@email.com'
      } as any) as IUser;

      const userWithDifferentUsername = ({
        ...userWithUniqueDetails,
        username: 'anotherUniqueUsername'
      } as any) as IUser;

      const userWithDifferentUsernameAndEmail = ({
        ...userWithDifferentUsername,
        emailAddress: 'secondUnique@email.com'
      } as any) as IUser;

      MockUserModel.userToRespondWith = null;

      await expect(
        registerController((MockUserModel as unknown) as IUserModel)(
          userWithUniqueDetails
        )
      ).resolves.not.toThrowError();

      MockUserModel.userToRespondWith = userWithUniqueDetails;

      await expect(
        registerController((MockUserModel as unknown) as IUserModel)(
          userWithUniqueDetails
        )
      ).rejects.toThrowError('Username is not available');

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
