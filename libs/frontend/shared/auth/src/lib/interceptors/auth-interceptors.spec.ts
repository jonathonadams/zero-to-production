import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { AuthInterceptor } from './auth-interceptor';
import { AuthFacade } from '../+state/auth.facade';
import { Type } from '@angular/core';
import { JWTAuthService } from '../services/jwt-auth.service';

describe('AuthInterceptor', () => {
  const testData = { name: 'Test Data' };
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: JWTAuthService;
  let authFacade: AuthFacade;
  const authSpy = { getAuthorizationToken: jest.fn() };
  const authFacadeSpy = { logout: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        { provide: JWTAuthService, useValue: authSpy },
        { provide: AuthFacade, useValue: authFacadeSpy }
      ]
    });

    httpClient = TestBed.get<HttpClient>(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    authServiceSpy = TestBed.get<JWTAuthService>(JWTAuthService);
    authFacade = TestBed.get<AuthFacade>(AuthFacade);
  });

  it('should add a Bearer token to the Authorization header of all outgoing request', () => {
    const spy = jest.spyOn(authFacade, 'logout');

    const token = 'TOKEN';
    authServiceSpy.getAuthorizationToken = jest.fn(() => token);

    const someData = { data: 'someData ' };

    // Make an HTTP GET request
    httpClient.get('/test').subscribe(data => {
      // When observable resolves, result should match test data
      expect(data).toEqual(someData);
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('/test');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    expect(req.request.headers.get('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(someData);

    // Assert the logout wat not called
    expect(spy).not.toHaveBeenCalled();

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should log the user out if the response is a 401 (Unauthorized)', () => {
    const spy = jest.spyOn(authFacade, 'logout');

    // Make an HTTP GET request, don't care about the response
    httpClient.get('/test').subscribe(data => {});

    const req = httpTestingController.expectOne('/test');

    // Set the response to be a 401
    req.flush({}, { status: 401, statusText: 'Unauthorized' });

    // Assert the logout wat not called
    expect(spy).toHaveBeenCalled();

    httpTestingController.verify();
  });
});
