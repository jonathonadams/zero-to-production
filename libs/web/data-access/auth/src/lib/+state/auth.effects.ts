import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { IUser } from '@uqt/interfaces';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { JWTAuthService } from '../services/jwt-auth.service';
import { ILoginResponse } from '../auth.interface';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
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
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ token }) => this.jwtService.setAuthorizationToken(token)),
      // tap(() => this.formFacade.clearData()),
      map(() => AuthActions.loginRedirect())
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ details }) =>
        this.authService.register(details).pipe(
          map(result => {
            if (result.errors) {
              return AuthActions.registerFailure({
                error: result.errors[0].message
              });
            } else {
              return AuthActions.registerSuccess({
                user: (result.data as { register: IUser }).register
              });
            }
          }),
          catchError((error: HttpErrorResponse) =>
            of(AuthActions.registerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerSuccess),
      map(() => AuthActions.logoutRedirect())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.jwtService.removeAuthorizationToken()),
      map(() => AuthActions.logoutRedirect())
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private jwtService: JWTAuthService
  ) {}
}
