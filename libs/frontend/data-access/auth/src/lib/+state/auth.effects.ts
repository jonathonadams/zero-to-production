import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { JWTAuthService } from '../services/jwt-auth.service';
import { IUser, ILoginResponse } from '@workspace/shared/interfaces';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActions.login),
    exhaustMap(credentials =>
      // Note that when using GraphQL as a login option,
      // Any errors will not be errors in the HTTP request (will be status 200)
      // But rather an array on the result.errors property
      this.authService.login(credentials).pipe(
        map(result => {
          if (result.errors) {
            return AuthActions.loginFailure({
              error: result.errors[0].message
            });
          } else {
            // The data property will alway exist here as there was not errors property
            return AuthActions.loginSuccess(
              (result.data as { login: ILoginResponse }).login
            );
          }
        }),
        catchError((error: HttpErrorResponse) =>
          of(AuthActions.loginFailure({ error: error.message }))
        )
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({ token }) => this.jwtService.setAuthorizationToken(token)),
    map(action => AuthActions.loginRedirect())
  );

  @Effect()
  register$ = this.actions$.pipe(
    ofType(AuthActions.register),
    exhaustMap(({ details }) =>
      this.authService.register(details).pipe(
        map(result => {
          if (result.errors) {
            return AuthActions.registerFailure({
              error: result.errors[0].message
            });
          } else {
            return AuthActions.registerSuccess(
              (result.data as { register: IUser }).register
            );
          }
        }),
        catchError((error: HttpErrorResponse) =>
          of(AuthActions.registerFailure({ error: error.message }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActions.registerSuccess),
    tap(success => console.log(success))
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => this.jwtService.removeAuthorizationToken()),
    map(() => AuthActions.logoutRedirect())
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private jwtService: JWTAuthService
  ) {}
}
