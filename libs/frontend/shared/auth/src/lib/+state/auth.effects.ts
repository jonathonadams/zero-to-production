import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
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
      this.authService.login(auth).pipe(
        map(result => result.data.login), // use this for graphql
        map(loginResponse => new LoginSuccess(loginResponse)),
        catchError(error => of(new LoginFailure(error)))
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
