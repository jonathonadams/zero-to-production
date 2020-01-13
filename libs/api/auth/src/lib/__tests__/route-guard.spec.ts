import * as Koa from 'koa';
import mongoose from 'mongoose';
import { verifyToken, verifyUserIsActive } from '../routes/route.guards';
import { signAccessToken } from '../token';
import { MockUserModel } from './user.mock';
import { IUserDocument, IUserModel } from '@uqt/api/core-data';
import { privateKey, publicKey, invalidPrivateKey } from './rsa-keys';

export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}
const accessTokenIssuer = 'issuer';

describe('Rest Auth Guards', () => {
  const accessTokenExpireTime = 1 * 60 * 60 * 1000;
  let jwt: string;
  let invalidJwt: string;

  beforeAll(() => {
    jwt = signAccessToken({
      accessTokenPrivateKey: privateKey,
      accessTokenExpireTime,
      accessTokenIssuer: 'issuer'
    })({
      id: '1',
      role: 0
    } as IUserDocument);
    invalidJwt = signAccessToken({
      accessTokenPrivateKey: invalidPrivateKey,
      accessTokenExpireTime,
      accessTokenIssuer
    })({
      id: '1',
      role: 0
    } as IUserDocument);
  });

  describe('verifyToken', () => {
    it('should call the next handler if a JWT is provided and is valid', async () => {
      const nextSpy = jest.fn();

      await expect(
        verifyToken(publicKey, accessTokenIssuer)(
          { request: { token: jwt }, state: {} },
          nextSpy
        )
      ).resolves.not.toThrowError();

      expect(nextSpy).toHaveBeenCalled();
    });

    it('should throw 401 Unauthorized if the JWT is not provided', async () => {
      const nextSpy = jest.fn();

      await expect(
        verifyToken(publicKey, accessTokenIssuer)(
          { request: {}, state: {} },
          nextSpy
        )
      ).rejects.toThrowError('Unauthorized');

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should throw 401 Unauthorized if the JWT signature is not correct', async () => {
      const nextSpy = jest.fn();

      await expect(
        verifyToken(publicKey, accessTokenIssuer)(
          { request: { token: invalidJwt }, state: {} },
          nextSpy
        )
      ).rejects.toThrowError('Unauthorized');

      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should throw 401 Unauthorized if the JWT issuer is not correct', async () => {
      const nextSpy = jest.fn();

      await expect(
        verifyToken(publicKey, 'some-different-issuer')(
          { request: { token: invalidJwt }, state: {} },
          nextSpy
        )
      ).rejects.toThrowError('Unauthorized');

      expect(nextSpy).not.toHaveBeenCalled();
    });
  });

  describe('verifyUserIsActive', () => {
    it('should call the next handler if a JWT is provided and is valid', async () => {
      const nextSpy = jest.fn();

      const id = newId();
      const mockUser = {
        id,
        active: true
      } as IUserDocument;

      const spy = jest.spyOn(MockUserModel, 'findById');

      MockUserModel.userToRespondWith = mockUser;
      await expect(
        verifyUserIsActive((MockUserModel as unknown) as IUserModel)(
          ({
            state: { token: { sub: id } }
          } as unknown) as Koa.ParameterizedContext,
          nextSpy
        )
      ).resolves.not.toThrowError();

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
      expect(nextSpy).toHaveBeenCalled();

      MockUserModel.reset();
    });

    it('should throw 401 Unauthorized if the User can not be found', async () => {
      const nextSpy = jest.fn();

      const wrongId = newId();

      const mockUser = {
        id: newId(),
        active: true
      } as IUserDocument;

      const spy = jest.spyOn(MockUserModel, 'findById');

      MockUserModel.userToRespondWith = mockUser;

      await expect(
        verifyUserIsActive((MockUserModel as unknown) as IUserModel)(
          ({
            state: { token: { sub: wrongId } }
          } as unknown) as Koa.ParameterizedContext,
          nextSpy
        )
      ).rejects.toThrowError('Unauthorized');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(wrongId);
      expect(nextSpy).not.toHaveBeenCalled();
    });

    it('should throw 401 Unauthorized if the User is not active', async () => {
      const nextSpy = jest.fn();

      const id = newId();
      const mockUser = {
        id,
        active: false
      } as IUserDocument;

      const spy = jest.spyOn(MockUserModel, 'findById');

      MockUserModel.userToRespondWith = mockUser;
      await expect(
        verifyUserIsActive((MockUserModel as unknown) as IUserModel)(
          ({
            state: { token: { sub: id } }
          } as unknown) as Koa.ParameterizedContext,
          nextSpy
        )
      ).rejects.toThrowError('Unauthorized');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
      expect(nextSpy).not.toHaveBeenCalled();

      MockUserModel.reset();
    });
  });
});
