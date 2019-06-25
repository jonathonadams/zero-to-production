import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, map, tap, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../services/auth.service';
import { JWTAuthService } from '../services/jwt-auth.service';

// TODO -> All HTTP ERRORS

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
            return AuthActions.loginFailure({ error: result.errors[0] });
          } else {
            // The data property will alway exist here as there was not errors property
            return AuthActions.loginSuccess((result.data as any).login);
          }
        })
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
