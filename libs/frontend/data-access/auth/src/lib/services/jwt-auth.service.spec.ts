import { TestBed } from '@angular/core/testing';
import { sign } from 'jsonwebtoken';
import { JWTAuthService } from './jwt-auth.service';
import { LocalStorageService } from '@ngw/frontend/utils/storage';

describe('JWTAuthService', () => {
  let jwtService: JWTAuthService;
  let lsService: LocalStorageService;
  let JWT: string;
  const storageKey = 'access_token';
  const tokenSecret = 'this-is-a-test-secret';
  const lsSpy = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JWTAuthService,
        { provide: LocalStorageService, useValue: lsSpy }
      ]
    });

    // Create a JWT for each test that is valid and has not expired
    JWT = sign(
      {
        role: 0
      },
      tokenSecret,
      {
        subject: '123',
        expiresIn: 1000
      }
    );

    jwtService = TestBed.get<JWTAuthService>(JWTAuthService);
    lsService = TestBed.get<LocalStorageService>(LocalStorageService);
  });

  it('should be created', () => {
    expect(jwtService).toBeTruthy();
  });

  describe('setAuthorizationToken', () => {
    it('should invoke localStorageService.setItem() with the storage key and token', () => {
      const spy = jest.spyOn(lsService, 'setItem');

      jwtService.setAuthorizationToken(JWT);

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual(storageKey);
      expect(spy.mock.calls[0][1]).toEqual(JWT);
    });
  });

  describe('getAuthorizationToken', () => {
    it('should invoke localStorageService.get() with the storage key', () => {
      const spy = jest.spyOn(lsService, 'getItem').mockReturnValue(JWT);

      const token = jwtService.getAuthorizationToken();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual(storageKey);
      expect(token).toEqual(JWT);
    });
  });

  describe('removeAuthorizationToken', () => {
    it('should invoke localStorageService.removeItem() with the storage key', () => {
      const spy = jest.spyOn(lsService, 'removeItem');

      jwtService.removeAuthorizationToken();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toEqual(storageKey);
    });
  });

  describe('decodeToken', () => {
    it('should return a decoded token', () => {
      const decodedToken = jwtService.decodeToken(JWT);

      expect(typeof decodedToken).toEqual('object');
      expect(decodedToken.sub).toEqual('123');
    });
  });

  describe('checkTokenIsValid', () => {
    it('should return true if the token has not expired', () => {
      const token = sign({}, tokenSecret, { expiresIn: 10000, subject: '1' });
      const valid = jwtService.checkTokenIsValid(token);

      expect(valid).toEqual(true);
    });

    it('should return false if the token has expired', () => {
      const token = sign({}, tokenSecret, { expiresIn: -10000, subject: '1' });
      const valid = jwtService.checkTokenIsValid(token);

      expect(valid).toEqual(false);
    });
  });
});
