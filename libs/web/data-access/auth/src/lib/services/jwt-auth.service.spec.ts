import { TestBed } from '@angular/core/testing';
import { sign } from 'jsonwebtoken';
import { JWTAuthService } from './jwt-auth.service';

describe('JWTAuthService', () => {
  let jwtService: JWTAuthService;
  let JWT: string;
  const storageKey = 'access_token';
  const tokenSecret = 'this-is-a-test-secret';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JWTAuthService]
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

    jwtService = TestBesd.inject<JWTAuthService>(JWTAuthService);
  });

  afterEach(() => {
    localStorage.removeItem(storageKey);
  });

  it('should be created', () => {
    expect(jwtService).toBeTruthy();
  });

  describe('setAuthorizationToken', () => {
    it('should set the access token', () => {
      localStorage.removeItem(storageKey);
      const tokenBeforeSetting = localStorage.getItem(storageKey);
      expect(tokenBeforeSetting).toEqual(null);

      jwtService.setAuthorizationToken(JWT);
      const token = localStorage.getItem(storageKey);

      expect(token).toBeTruthy();
      expect(token).toEqual(JWT);
    });
  });

  describe('getAuthorizationToken', () => {
    it('should get the access token', () => {
      localStorage.setItem(storageKey, JWT);
      const token = jwtService.getAuthorizationToken();

      expect(token).toBeDefined();
      expect(token).toEqual(JWT);
    });
  });

  describe('removeAuthorizationToken', () => {
    it('should remove the access token', () => {
      localStorage.setItem(storageKey, JWT);
      const token = localStorage.getItem(storageKey);

      // First check the token is there
      expect(token).toBeTruthy();

      // Call the remove token function
      jwtService.removeAuthorizationToken();

      const tokenAfterRemove = localStorage.getItem(storageKey);
      expect(tokenAfterRemove).toEqual(null);
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
