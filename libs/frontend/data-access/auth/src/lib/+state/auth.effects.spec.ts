import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot, Scheduler } from 'jest-marbles';
import { createSpyObj } from '@app-testing/frontend/helpers';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import { ILoginCredentials } from '@workspace/shared/interfaces';
import * as AuthActions from './auth.actions';
import { GraphQLError } from 'graphql';
import { JWTAuthService } from '../services/jwt-auth.service';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: AuthService;
  let actions$: Observable<any>;
  let router: Router;
  let jwtService: JWTAuthService;
  const authSpy = createSpyObj('AuthService', ['login']);
  const jwtServiceSpy = createSpyObj('JWTAuthService', [
    'setAuthorizationToken',
    'removeAuthorizationToken'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: JWTAuthService, useValue: jwtServiceSpy },
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
    jwtService = TestBed.get<JWTAuthService>(JWTAuthService);

    spyOn(router, 'navigate').and.callThrough();
  });

  describe('login$', () => {
    it('should return an LoginSuccess action, with user information if login succeeds', () => {
      const credentials: ILoginCredentials = { username: 'test', password: '' };
      const token = 'JWT.TOKEN';
      const action = AuthActions.login(credentials);
      const completion = AuthActions.loginSuccess({ token });

      actions$ = hot('-a---', { a: action });
      // Example graphql response below
      const response = cold('-a|', { a: { data: { login: { token } } } });
      const expected = cold('--b', { b: completion });
      authService.login = jest.fn(() => response);

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a new LoginFailure if the login service throws', () => {
      const credentials: ILoginCredentials = {
        username: 'someOne',
        password: ''
      };
      const action = AuthActions.login(credentials);
      const error = new GraphQLError('Invalid username or password');
      const completion = AuthActions.loginFailure({ error });

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
      const action = AuthActions.loginSuccess({ token });
      const completion = AuthActions.loginRedirect();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
    });

    it('should call the AuthService.setAuthorizationToken with the returned token', done => {
      const spy = jest.spyOn(jwtService, 'setAuthorizationToken');
      spy.mockReset();
      const token = 'JWT.TOKEN';
      const action = AuthActions.loginSuccess({ token });

      actions$ = hot('-a---', { a: action });

      effects.loginSuccess$.subscribe(someAction => {
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
      const action = AuthActions.logout();
      const completion = AuthActions.logoutRedirect();

      actions$ = hot('-a---', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should call the AuthService.removeAuthorizationToken with the returned token', done => {
      const spy = jest.spyOn(jwtService, 'removeAuthorizationToken');
      spy.mockReset();
      const action = AuthActions.logout();

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
