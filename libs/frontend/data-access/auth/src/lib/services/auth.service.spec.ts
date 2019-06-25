import { TestBed } from '@angular/core/testing';
import { GraphQLError } from 'graphql';
import { createSpyObj } from '@testing/frontend-helpers';
import { GraphQLStub } from '@testing/stubs/graphql.stubs';
import { GraphQLService } from '@workspace/frontend/data-access/api';
import { LoginCredentials, LoginResponse } from '@workspace/shared/data';
import { AuthService } from './auth.service';
import { JWTAuthService } from './jwt-auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let graphQLStub: GraphQLStub;
  let jwtService: JWTAuthService;
  const jwtServiceSpy = createSpyObj('JWTAuthService', [
    'getAuthorizationToken',
    'checkTokenIsValid'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: JWTAuthService, useValue: jwtServiceSpy },
        { provide: GraphQLService, useClass: GraphQLStub }
      ]
    });
    authService = TestBed.get<AuthService>(AuthService);
    graphQLStub = TestBed.get<GraphQLService>(GraphQLService);
    jwtService = TestBed.get<JWTAuthService>(JWTAuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('checkUserIsLoggedIn', () => {
    it('should return true if there is a token and it is valid', () => {
      jwtService.getAuthorizationToken = jest.fn(() => 'some_token');
      jwtService.checkTokenIsValid = jest.fn((token: string) => true);
      const loggedIn = authService.checkUserIsLoggedIn();

      expect(loggedIn).toEqual(true);
    });

    it('should return false if there is no token', () => {
      jwtService.getAuthorizationToken = jest.fn(() => null);
      const loggedIn = authService.checkUserIsLoggedIn();

      expect(loggedIn).toEqual(false);
    });

    it('should return false if the token is invalid', () => {
      // const token = sign({}, tokenSecret, { expiresIn: -10000, subject: '1' });
      // localStorage.setItem(storageKey, token);

      jwtService.getAuthorizationToken = jest.fn(() => 'some_token');
      jwtService.checkTokenIsValid = jest.fn((token: string) => false);

      const loggedIn = authService.checkUserIsLoggedIn();

      expect(loggedIn).toEqual(false);
    });
  });

  describe('login', () => {
    // GraphQL login response check
    it('should return a LoginResponse if called with valid credentials', () => {
      const spy = jest.spyOn(graphQLStub, 'mutation');
      const loginCredentials: LoginCredentials = {
        username: 'admin',
        password: 'secret'
      };
      const expectedResponse: LoginResponse = {
        token: 'JWT'
      };
      // Set the response from the the stub
      graphQLStub.setExpectedResponse<{ login: LoginResponse }>({
        login: expectedResponse
      });
      authService.login(loginCredentials).subscribe(
        response => {
          expect(response.errors).toBeUndefined();
          expect((response.data as any).login).toBeDefined();
          expect((response.data as any).login).toEqual(expectedResponse);
          expect(graphQLStub.mutation).toHaveBeenCalled();
          expect(spy.mock.calls[0][1]).toEqual(loginCredentials);
        },
        error => console.log(error)
      );
    });
    it('should return an error if credentials are incorrect', () => {
      const spy = jest.spyOn(graphQLStub, 'mutation');
      const loginCredentials: LoginCredentials = {
        username: 'unauthorized',
        password: 'noi dea'
      };
      const graphErrors = [
        { name: 'Unauthorized Error', message: 'Unauthorized' }
      ] as GraphQLError[];
      // Set the response from the the stub
      graphQLStub.setErrorResponse(graphErrors);
      authService.login(loginCredentials).subscribe(
        response => {
          expect(response.data).toEqual(null);
          expect(response.errors).toBeDefined();
          expect((response.errors as any[][0]).message).toEqual('Unauthorized');
          expect(graphQLStub.mutation).toHaveBeenCalled();
          expect(spy.mock.calls[0][1]).toEqual(loginCredentials);
        },
        error => console.log(error)
      );
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
});
