import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { NotificationService } from '@uqt/utils/notifications';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { JWTAuthService } from '../services/jwt-auth.service';
import { DynamicFormFacade } from '@uqt/data-access/dynamic-form';
import { ILoginResponse } from '../auth.interface';
import { IUser } from '@uqt/interfaces';

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
    // tap(() => this.formFacade.clearData()),
    map(() => AuthActions.loginRedirect())
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() =>
          this.ns.emit('Provided credentials are incorrect. Please Try Again')
        )
      ),
    {
      dispatch: false
    }
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
  );

  @Effect()
  registerSuccess$ = this.actions$.pipe(
    ofType(AuthActions.registerSuccess),
    // tap(() => this.formFacade.clearData()),
    tap(() => this.ns.emit('Registration Successful. Please log in.')),
    map(() => AuthActions.logoutRedirect())
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
    private jwtService: JWTAuthService,
    private formFacade: DynamicFormFacade,
    private ns: NotificationService
  ) {}
}
