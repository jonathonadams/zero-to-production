import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { AuthFacade } from '../+state/auth.facade';
import { Type } from '@angular/core';
import { ErrorInterceptor } from './error-interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authFacade: AuthFacade;
  const authFacadeSpy = { logout: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        { provide: AuthFacade, useValue: authFacadeSpy }
      ]
    });

    httpClient = TestBed.inject<HttpClient>(HttpClient);
    httpTestingController = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    authFacade = TestBed.inject<AuthFacade>(AuthFacade);
  });

  it('should not log the user out if the response is not a 401 (Unauthorized)', () => {
    const spy = jest.spyOn(authFacade, 'logout');

    // Make an HTTP GET request, don't care about the response
    httpClient.get('/test').subscribe(data => {});

    const req = httpTestingController.expectOne('/test');

    // Set the response to be a 401
    req.flush({}, { status: 200, statusText: 'Ok' });

    // Assert the logout wat not called
    expect(spy).not.toHaveBeenCalled();

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
