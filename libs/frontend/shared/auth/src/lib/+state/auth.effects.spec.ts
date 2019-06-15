import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot, Scheduler } from 'jest-marbles';
import { createSpyObj } from '@workspace/frontend/utils/test-helpers';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import { LoginCredentials } from 'typings/auth';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  LoginRedirect,
  Logout,
  LogoutRedirect
} from './auth.actions';
import { GraphQLError } from 'graphql';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions$: Observable<any>;
  let router: any;
  const authSpy = createSpyObj('AuthService', [
    'login',
    'setAuthorizationToken',
    'removeAuthorizationToken'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        {
          provide: AuthService,
          useValue: authSpy
        },
        provideMockActions(() => actions$),
        {
          provide: Router,
          useValue: { navigate: jest.fn() }
        }
      ]
    });

    effects = TestBed.get<AuthEffects>(AuthEffects);
    authService = TestBed.get<AuthService>(AuthService);
    actions$ = TestBed.get<Actions>(Actions);
    router = TestBed.get<Router>(Router);

    spyOn(router, 'navigate').and.callThrough();
  });

  describe('login$', () => {
    it('should return an LoginSuccess action, with user information if login succeeds', () => {
      const credentials: LoginCredentials = { username: 'test', password: '' };
      const token = 'JWT.TOKEN';
      const action = new Login(credentials);
      const completion = new LoginSuccess({ token });

      actions$ = hot('-a---', { a: action });
      // Example graphql response below
      const response = cold('-a|', { a: { data: { login: { token } } } });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a new LoginFailure if the login service throws', () => {
      const credentials: LoginCredentials = {
        username: 'someOne',
        password: ''
      };
      const action = new Login(credentials);
      const error = new GraphQLError('Invalid username or password');
      const completion = new LoginFailure(error);

      /**
       * Note that with a GraphQL error, the http request does not fail,
       * rather it succeeds but has a errors property that is an array of GraphQL error
       * hence the response observable is not an error thrown, but a successful response
       */
      actions$ = hot('-a---', { a: action });
      // Do not throw error, success with an errors property
      const response = cold('-a|', { a: { errors: [error] } });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should dispatch a LoginRedirect action', () => {
      const token = 'JWT.TOKEN';
      const action = new LoginSuccess({ token });
      const completion = new LoginRedirect();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
    });

    it('should call the AuthService.setAuthorizationToken with the returned token', done => {
      const spy = jest.spyOn(authService, 'setAuthorizationToken');
      spy.mockReset();
      const token = 'JWT.TOKEN';
      const action = new LoginSuccess({ token });

      actions$ = hot('-a---', { a: action });

      effects.loginSuccess$.subscribe(actn => {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(token);
        done();
      });

      Scheduler.get().flush();

      spy.mockReset();
    });
  });

  describe('logout$', () => {
    it('should dispatch a LogoutRedirect action', () => {
      const action = new Logout();
      const completion = new LogoutRedirect();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should call the AuthService.removeAuthorizationToken with the returned token', done => {
      const spy = jest.spyOn(authService, 'removeAuthorizationToken');
      spy.mockReset();
      const action = new Logout();

      actions$ = hot('-a---', { a: action });

      effects.logout$.subscribe(act => {
        expect(spy).toHaveBeenCalled();
        done();
      });

      Scheduler.get().flush();

      spy.mockReset();
    });
  });
});
