import { GraphQLResolveInfo } from 'graphql';
import mongoose from 'mongoose';
import {
  checkToken,
  checkUserIsActive,
  checkUserRole
} from '../graphql/graphql.guards';
import { signAccessToken } from '../token';
import { MockUserModel } from './user.mock';
import { IUserDocument, IUserModel } from '@uqt/api/core-data';
import { AuthenticationRoles } from '@uqt/interfaces';
import { PRIVATE_KEY, PUBLIC_KEY, INVALID_KEY } from './rsa-keys';

export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}

const accessTokenPrivateKey = PRIVATE_KEY;
const accessTokenPublicKey = PUBLIC_KEY;
const invalidPrivateKey = INVALID_KEY;

describe('GraphQL Auth Guards', () => {
  const accessTokenExpireTime = 1 * 60 * 60 * 1000;

  let jwt: string;
  let invalidJwt: string;

  beforeAll(() => {
    jwt = signAccessToken({ accessTokenPrivateKey, accessTokenExpireTime })({
      id: '1',
      role: 0
    } as IUserDocument);
    invalidJwt = signAccessToken({
      accessTokenPrivateKey: invalidPrivateKey,
      accessTokenExpireTime
    })({
      id: '1',
      role: 0
    } as IUserDocument);
  });

  describe('checkToken', () => {
    it('should not throw an error if a JWT is provided and is valid', async () => {
      await expect(
        checkToken(accessTokenPublicKey)(
          {},
          {},
          { state: {}, token: jwt },
          {} as GraphQLResolveInfo
        )
      ).resolves.not.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT is not provided', async () => {
      await expect(
        checkToken(accessTokenPublicKey)({}, {}, {}, {} as GraphQLResolveInfo)
      ).rejects.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT is not valid', async () => {
      await expect(
        checkToken(accessTokenPublicKey)(
          {},
          {},
          { token: invalidJwt },
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError();
    });
  });

  describe('checkUserIsActive', () => {
    it('should not throw an error if the user is present and active.', async () => {
      const id = newId();
      const mockUser = {
        id,
        active: true
      } as IUserDocument;

      const spy = jest.spyOn(MockUserModel, 'findById');

      const ctx = { state: { token: { sub: id } } };
      MockUserModel.userToRespondWith = mockUser;

      await expect(
        checkUserIsActive((MockUserModel as unknown) as IUserModel)(
          {},
          {},
          ctx,
          {} as GraphQLResolveInfo
        )
      ).resolves.not.toThrowError();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
      expect((ctx.state as any).user).toEqual(mockUser);

      MockUserModel.reset();
    });

    it('should throw 401 Unauthorized if the user can not be found', async () => {
      const id = newId();
      const spy = jest.spyOn(MockUserModel, 'findById');

      const ctx = { state: { token: { sub: id } } };
      MockUserModel.userToRespondWith = null;

      await expect(
        checkUserIsActive((MockUserModel as unknown) as IUserModel)(
          {},
          {},
          ctx,
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError('Unauthorized');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
      expect((ctx.state as any).user).not.toBeDefined();

      MockUserModel.reset();
    });

    it('should throw 401 Unauthorized if the user is not active', async () => {
      const id = newId();
      const mockUser = {
        id,
        active: false
      } as IUserDocument;

      const spy = jest.spyOn(MockUserModel, 'findById');

      const ctx = { state: { token: { sub: id } } };
      MockUserModel.userToRespondWith = mockUser;

      await expect(
        checkUserIsActive((MockUserModel as unknown) as IUserModel)(
          {},
          {},
          ctx,
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError('Unauthorized');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
      expect((ctx.state as any).user).not.toEqual(mockUser);

      MockUserModel.reset();
    });
  });

  describe('checkUserRole', () => {
    it('should not throw an error if the user role is correct.', async () => {
      const id = newId();
      const mockUser = {
        id,
        active: true,
        role: AuthenticationRoles.Admin
      } as IUserDocument;

      const ctx = { state: { user: mockUser } };

      await expect(
        checkUserRole(AuthenticationRoles.Admin)(
          {},
          {},
          ctx,
          {} as GraphQLResolveInfo
        )
      ).resolves.not.toThrowError();
    });

    it('should throw an error if the user role is note correct.', async () => {
      const id = newId();
      const mockUser = {
        id,
        active: true,
        role: AuthenticationRoles.User
      } as IUserDocument;

      const ctx = { state: { user: mockUser } };

      await expect(
        checkUserRole(AuthenticationRoles.Admin)(
          {},
          {},
          ctx,
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError('Unauthorized');
    });
  });
});
