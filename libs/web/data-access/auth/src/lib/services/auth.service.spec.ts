import { TestBed } from '@angular/core/testing';
import { GraphQLError } from 'graphql';
import { sign } from 'jsonwebtoken';
import { createSpyObj } from '@app-testing/frontend/helpers';
import { GraphQLStub } from '@app-testing/frontend/stubs/graphql.stubs';
import { HttpStub } from '@app-testing/frontend/stubs/http.stubs';
import { GraphQLService, ApiService } from '@uqt/data-access/api';
import { AuthService } from './auth.service';
import {
  ILoginCredentials,
  ILoginResponse,
  IRegistrationDetails
} from '../auth.interface';
import { AuthenticationRoles, IUser } from '@uqt/interfaces';

describe('AuthService', () => {
  let authService: AuthService;
  let graphQLStub: GraphQLService;
  let apiStub: ApiService;

  let JWT: string;
  const storageKey = 'access_token';
  const tokenSecret = 'this-is-a-test-secret';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: GraphQLService, useClass: GraphQLStub },
        { provide: ApiService, useValue: HttpStub }
      ]
    });
    authService = TestBed.inject<AuthService>(AuthService);
    graphQLStub = TestBed.inject<GraphQLService>(GraphQLService);
    apiStub = TestBed.inject<ApiService>(ApiService);

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
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    // GraphQL login response check
    it('should return a LoginResponse if called with valid credentials', () => {
      const spy = jest.spyOn(graphQLStub, 'mutation');
      const loginCredentials: ILoginCredentials = {
        username: 'admin',
        password: 'secret'
      };
      const expectedResponse: ILoginResponse = {
        token: 'JWT'
      };
      // Set the response from the the stub
      ((graphQLStub as unknown) as GraphQLStub).setExpectedResponse<{
        login: ILoginResponse;
      }>({
        login: expectedResponse
      });
      authService.login(loginCredentials).subscribe(response => {
        expect(response.errors).toBeUndefined();
        expect((response.data as any).login).toBeDefined();
        expect((response.data as any).login).toEqual(expectedResponse);
        expect(graphQLStub.mutation).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toEqual(loginCredentials);
      }, console.error);
    });
    it('should return an error if credentials are incorrect', () => {
      const spy = jest.spyOn(graphQLStub, 'mutation');
      const loginCredentials: ILoginCredentials = {
        username: 'unauthorized',
        password: 'noi dea'
      };
      const graphErrors = [
        { name: 'Unauthorized Error', message: 'Unauthorized' }
      ] as GraphQLError[];
      // Set the response from the the stub
      ((graphQLStub as unknown) as GraphQLStub).setErrorResponse(graphErrors);
      authService.login(loginCredentials).subscribe(response => {
        expect(response.data).toEqual(null);
        expect(response.errors).toBeDefined();
        expect((response.errors as any[][0]).message).toEqual('Unauthorized');
        expect(graphQLStub.mutation).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toEqual(loginCredentials);
      }, console.error);
    });
  });

  describe('register', () => {
    // GraphQL login response check
    it('should return a User if registration is successfully', () => {
      const spy = jest.spyOn(graphQLStub, 'mutation');
      const newUser: IRegistrationDetails = {
        username: 'test user',
        givenName: 'test',
        surname: 'user',
        email: 'test@domain.com',
        dateOfBirth: '2019-01-01',
        password: 'asF.s0f.s'
      };

      const expectedResponse: IUser = {
        id: 'some-id',
        role: AuthenticationRoles.User,
        active: true,
        isValid: true,
        ...newUser
      };

      // Set the response from the the stub
      ((graphQLStub as unknown) as GraphQLStub).setExpectedResponse<{
        user: IUser;
      }>({
        user: expectedResponse
      });

      authService.register(newUser).subscribe(response => {
        expect(response.errors).toBeUndefined();
        expect((response.data as any).login).toBeDefined();
        expect((response.data as any).login).toEqual(expectedResponse);
        expect(graphQLStub.mutation).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toEqual(newUser);
      }, console.error);
    });
    it('should return an error if registration is invalid', () => {
      const spy = jest.spyOn(graphQLStub, 'mutation');

      const newUser = ({
        username: 'test user',
        givenName: 'test',
        surname: 'user',
        email: 'test@domain.com',
        dateOfBirth: '2019-01-01'
      } as any) as IRegistrationDetails;

      const graphErrors = [
        { name: 'Bad request', message: 'No password provided' }
      ] as GraphQLError[];

      // Set the response from the the stub
      ((graphQLStub as unknown) as GraphQLStub).setErrorResponse(graphErrors);
      authService.register(newUser).subscribe(response => {
        expect(response.data).toEqual(null);
        expect(response.errors).toBeDefined();
        expect((response.errors as any[][0]).message).toEqual(
          'No password provided'
        );
        expect(graphQLStub.mutation).toHaveBeenCalled();
        expect(spy.mock.calls[0][1]).toEqual(newUser);
      }, console.error);
    });

    // REST spec
    // it('should make a POST request with LoginCredentials to the /authorize route', () => {
    //   const loginCredentials: LoginCredentials = {
    //     username: 'admin',
    //     password: 'secret'
    //   };
    //   const expectedResponse: LoginResponse = {
    //     token: JWT
    //   };
    //   // Make an HTTP GET request
    //   authService.login(loginCredentials).subscribe(data => {
    //     // When observable resolves, result should match test data
    //     expect(data).toEqual(expectedResponse);
    //   });
    //   // The following `expectOne()` will match the request's URL.
    //   // If no requests or multiple requests matched that URL
    //   // `expectOne()` would throw.
    //   const req = httpTestingController.expectOne(`${environment.serverUrl}/authorize`);
    //   // Assert that the request is a POST.
    //   expect(req.request.method).toEqual('POST');
    //   // Respond with mock data, causing Observable to resolve.
    //   // Subscribe callback asserts that correct data was returned.
    //   req.flush(expectedResponse);
    //   // Finally, assert that there are no outstanding requests.
    //   httpTestingController.verify();
    // });
  });

  describe('checkUserIsLoggedIn', () => {
    it('should return true if there is a token and it is valid', () => {
      authService.getAuthorizationToken = jest.fn(() => 'some_token');
      authService.checkTokenIsValid = jest.fn((token: string) => true);
      const loggedIn = authService.checkUserIsLoggedIn();

      expect(loggedIn).toEqual(true);
    });

    it('should return false if there is no token', () => {
      authService.getAuthorizationToken = jest.fn(() => null);
      const loggedIn = authService.checkUserIsLoggedIn();

      expect(loggedIn).toEqual(false);
    });

    it('should return false if the token is invalid', () => {
      // const token = sign({}, tokenSecret, { expiresIn: -10000, subject: '1' });
      // localStorage.setItem(storageKey, token);

      authService.getAuthorizationToken = jest.fn(() => 'some_token');
      authService.checkTokenIsValid = jest.fn((token: string) => false);

      const loggedIn = authService.checkUserIsLoggedIn();

      expect(loggedIn).toEqual(false);
    });
  });

  describe('setAuthorizationToken', () => {
    it('should set the access token', () => {
      localStorage.removeItem(storageKey);
      const tokenBeforeSetting = localStorage.getItem(storageKey);
      expect(tokenBeforeSetting).toEqual(null);

      authService.setAuthorizationToken(JWT);
      const token = localStorage.getItem(storageKey);

      expect(token).toBeTruthy();
      expect(token).toEqual(JWT);
    });
  });

  describe('getAuthorizationToken', () => {
    it('should get the access token', () => {
      localStorage.setItem(storageKey, JWT);
      const token = authService.getAuthorizationToken();

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
      authService.removeAuthorizationToken();

      const tokenAfterRemove = localStorage.getItem(storageKey);
      expect(tokenAfterRemove).toEqual(null);
    });
  });

  describe('decodeToken', () => {
    it('should return a decoded token', () => {
      const decodedToken = authService.decodeToken(JWT);

      expect(typeof decodedToken).toEqual('object');
      expect(decodedToken.sub).toEqual('123');
    });
  });

  describe('checkTokenIsValid', () => {
    it('should return true if the token has not expired', () => {
      const token = sign({}, tokenSecret, { expiresIn: 10000, subject: '1' });
      const valid = authService.checkTokenIsValid(token);

      expect(valid).toEqual(true);
    });

    it('should return false if the token has expired', () => {
      const token = sign({}, tokenSecret, { expiresIn: -10000, subject: '1' });
      const valid = authService.checkTokenIsValid(token);

      expect(valid).toEqual(false);
    });
  });
});
