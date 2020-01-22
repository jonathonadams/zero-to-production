import { GraphQLResolveInfo } from 'graphql';
import mongoose from 'mongoose';
// Mock the requests the the JWKs
jest.mock('jwks-rsa');
import { koaJwtSecret } from 'jwks-rsa';
import {
  checkToken,
  checkUserIsActive,
  checkUserRole,
  checkTokenJWKS
} from './graphql.guards';
import { signAccessToken } from '../token';
import { MockUserModel } from '../__tests__/user.mock';
import { IUserDocument, IUserModel } from '@uqt/api/core-data';
import { AuthenticationRoles } from '@uqt/interfaces';
import {
  privateKey,
  invalidPrivateKey,
  publicKey,
  invalidPublicKey
} from '../__tests__/rsa-keys';

export function newId() {
  return mongoose.Types.ObjectId().toHexString();
}

const issuer = 'some-issuer';
const audience = 'say-hello!!!';
const keyId = 'key-id';
const expireTime = 1 * 60 * 60 * 1000;

describe('GraphQL Auth Guards', () => {
  let jwt: string;
  let invalidJwt: string;

  beforeAll(() => {
    jwt = signAccessToken({
      privateKey,
      expireTime,
      issuer,
      audience,
      keyId
    })({
      id: '1',
      role: 0
    } as IUserDocument);
    invalidJwt = signAccessToken({
      privateKey: invalidPrivateKey,
      expireTime,
      issuer,
      audience,
      keyId
    })({
      id: '1',
      role: 0
    } as IUserDocument);
  });

  describe('checkToken', () => {
    it('should not throw an error if a JWT is provided and is valid', async () => {
      await expect(
        checkToken({ publicKey, issuer, audience })(
          {},
          {},
          { state: {}, token: jwt },
          {} as GraphQLResolveInfo
        )
      ).resolves.not.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT is not provided', async () => {
      await expect(
        checkToken({ publicKey, issuer, audience })(
          {},
          {},
          {},
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT signature is not correct', async () => {
      await expect(
        checkToken({ publicKey, issuer, audience })(
          {},
          {},
          { token: invalidJwt },
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT issuer is not correct', async () => {
      await expect(
        checkToken({
          publicKey,
          issuer: 'some-different-issuer',
          audience
        })({}, {}, { token: invalidJwt }, {} as GraphQLResolveInfo)
      ).rejects.toThrowError();
    });

    it('should throw 401 Unauthorized if the JWT audience is not correct', async () => {
      await expect(
        checkToken({
          publicKey,
          issuer,
          audience: 'wrong-audience'
        })({}, {}, { token: invalidJwt }, {} as GraphQLResolveInfo)
      ).rejects.toThrowError();
    });
  });

  describe('checkTokenJWKS', () => {
    it('should call the next handler if a valid JWT is provided and signed by the JWKS', async () => {
      (koaJwtSecret as any).mockReturnValueOnce(
        async (token: string) => publicKey
      );

      await expect(
        checkTokenJWKS({
          production: false,
          authServerUrl: 'http://some-url',
          issuer: issuer,
          audience
        })({}, {}, { state: {}, token: jwt }, {} as GraphQLResolveInfo)
      ).resolves.not.toThrowError();

      (koaJwtSecret as any).mockReset();
    });

    it('should throw 401 Unauthorized if the JWT is not provided', async () => {
      (koaJwtSecret as any).mockReturnValueOnce(
        async (token: string) => publicKey
      );

      await expect(
        checkTokenJWKS({
          production: false,
          authServerUrl: 'http://some-url',
          issuer,
          audience
        })({}, {}, {}, {} as GraphQLResolveInfo)
      ).rejects.toThrowError('Unauthorized');

      (koaJwtSecret as any).mockReset();
    });

    it('should throw 401 Unauthorized if the JWKS throws', async () => {
      (koaJwtSecret as any).mockReturnValueOnce(async (token: string) => {
        throw new Error('Error while getting JWKS');
      });

      await expect(
        checkTokenJWKS({
          production: false,
          authServerUrl: 'http://some-url',
          issuer,
          audience
        })({}, {}, { state: {}, token: jwt }, {} as GraphQLResolveInfo)
      ).rejects.toThrowError('Unauthorized');

      (koaJwtSecret as any).mockReset();
    });

    it('should throw 401 Unauthorized if the JWKS public key is incorrect', async () => {
      (koaJwtSecret as any).mockReturnValueOnce(
        async (token: string) => invalidPublicKey
      );

      await expect(
        checkTokenJWKS({
          production: false,
          authServerUrl: 'http://some-url',
          issuer,
          audience
        })({}, {}, { state: {}, token: jwt }, {} as GraphQLResolveInfo)
      ).rejects.toThrowError('Unauthorized');

      (koaJwtSecret as any).mockReset();
    });

    it('should throw 401 Unauthorized if the JWT issuer is not correct', async () => {
      (koaJwtSecret as any).mockReturnValueOnce(
        async (token: string) => publicKey
      );

      await expect(
        checkTokenJWKS({
          production: false,
          authServerUrl: 'http://some-url',
          issuer: 'some-wrong-issuer',
          audience
        })({}, {}, { state: {}, token: jwt }, {} as GraphQLResolveInfo)
      ).rejects.toThrowError('Unauthorized');

      (koaJwtSecret as any).mockReset();
    });

    it('should throw 401 Unauthorized if the JWT audience is not correct', async () => {
      (koaJwtSecret as any).mockReturnValueOnce(
        async (token: string) => publicKey
      );

      await expect(
        checkTokenJWKS({
          production: false,
          authServerUrl: 'http://some-url',
          issuer,
          audience: 'wrong-audience'
        })({}, {}, { state: {}, token: jwt }, {} as GraphQLResolveInfo)
      ).rejects.toThrowError('Unauthorized');

      (koaJwtSecret as any).mockReset();
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

      const ctx = { state: { user: { sub: id } } };
      MockUserModel.userToRespondWith = mockUser;

      await expect(
        checkUserIsActive({ User: (MockUserModel as unknown) as IUserModel })(
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

      const ctx = { state: { user: { sub: id } } };
      MockUserModel.userToRespondWith = null;

      await expect(
        checkUserIsActive({ User: (MockUserModel as unknown) as IUserModel })(
          {},
          {},
          ctx,
          {} as GraphQLResolveInfo
        )
      ).rejects.toThrowError('Unauthorized');

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);

      MockUserModel.reset();
    });

    it('should throw 401 Unauthorized if the user is not active', async () => {
      const id = newId();
      const mockUser = {
        id,
        active: false
      } as IUserDocument;

      const spy = jest.spyOn(MockUserModel, 'findById');

      const ctx = { state: { user: { sub: id } } };
      MockUserModel.userToRespondWith = mockUser;

      await expect(
        checkUserIsActive({ User: (MockUserModel as unknown) as IUserModel })(
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
