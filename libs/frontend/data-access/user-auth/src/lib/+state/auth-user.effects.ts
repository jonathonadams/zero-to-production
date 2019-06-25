import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DecodedJWT } from '@workspace/shared/data';
import {
  JWTAuthService,
  loginSuccess,
  logout
} from '@workspace/frontend/data-access/auth';
import {
  UsersService,
  loadUserSuccess
} from '@workspace/frontend/data-access/users';
import * as AuthUserActions from './auth-user.actions';

@Injectable()
export class AuthUsersEffects {
  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(loginSuccess),
    map(() => AuthUserActions.loadAuthUser())
  );

  @Effect()
  loadAuthUser$ = this.actions$.pipe(
    ofType(AuthUserActions.loadAuthUser),

    /**
     * It is not be possible for the JWT to be undefined
     * as the resolver will run AFTER the AuthGuard runs,
     */
    map(action => this.jwtService.getDecodedToken() as DecodedJWT),
    switchMap(token =>
      this.usersService.getOneUser(token.sub).pipe(
        map(user => AuthUserActions.loadAuthUserSuccess({ user })),
        catchError(error => of(AuthUserActions.loadAuthUserFail({ error })))
      )
    )
  );

  @Effect()
  loadAuthUserSuccess$ = this.actions$.pipe(
    ofType(AuthUserActions.loadAuthUserSuccess),
    map(user => loadUserSuccess(user))
  );

  @Effect()
  selectAuthenticatedUser$ = this.actions$.pipe(
    ofType(AuthUserActions.loadAuthUserSuccess),
    map(props => AuthUserActions.selectAuthUser({ id: props.user.id }))
  );

  @Effect()
  clearAuthenticatedUser$ = this.actions$.pipe(
    ofType(logout),
    map(() => AuthUserActions.clearAuthUser())
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private jwtService: JWTAuthService
  ) {}
}
