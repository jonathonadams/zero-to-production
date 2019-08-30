import { GraphQLResolveInfo } from 'graphql';
import { newId } from '@app-testing/index';
import { IUserDocument, IUserModel } from '@ngw/shared/interfaces';
import { AuthenticationRoles } from '@ngw/shared/enums';
import {
  checkToken,
  checkUserIsActive,
  checkUserRole
} from '../graphql.guards';
import { signAccessToken } from '../auth.utils';
import { MockUserModel } from './user.mock';

describe('GraphQL Auth Guards', () => {
  const validSecret = 'valid-secret';
  const expireTime = 1 * 60 * 60 * 1000;
  const invalidSecret = 'invalid-secret';
  let jwt: string;
  let invalidJwt: string;

  beforeAll(() => {
    jwt = signAccessToken({ secret: validSecret, expireTime })({
      id: '1',
      role: 0
    } as IUserDocument);
    invalidJwt = signAccessToken({
      secret: invalidSecret,
      expireTime
    })({
      id: '1',
      role: 0
    } as IUserDocument);
  });

  describe('checkToken', () => {
    it('should not throw an error if a JWT is provided and is valid', async () => {
      await expect(
        checkToken(validSecret)(
          {},
          {},
          { state: {}, token: jwt },
          {} as GraphQLResolveInfo
        )
      ).resolves.not.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT is not provided', async () => {
      await expect(
        checkToken(validSecret)({}, {}, {}, {} as GraphQLResolveInfo)
      ).rejects.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT is not valid', async () => {
      await expect(
        checkToken(validSecret)(
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
