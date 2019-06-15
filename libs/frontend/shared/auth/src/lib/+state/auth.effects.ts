import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
  LoginRedirect,
  LogoutRedirect
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { LoginCredentials } from 'typings/auth';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: LoginCredentials) =>
      // Note that when using GraphQL as a login option,
      // Any errors will not be errors in the HTTP request (will be status 200)
      // But rather an array on the result.errors property
      this.authService.login(auth).pipe(
        map(result => {
          if (result.errors) {
            return new LoginFailure(result.errors[0]);
          } else {
            // The data property will alway exist here as there was not errors property
            return new LoginSuccess((result.data as any).login);
          }
        })
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(action => this.authService.setAuthorizationToken(action.payload.token)),
    map(action => new LoginRedirect())
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.authService.removeAuthorizationToken()),
    map(() => new LogoutRedirect())
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
