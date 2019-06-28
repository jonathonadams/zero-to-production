import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserActions from './users.actions';
import { UsersService } from '../users.service';
import {
  JWTAuthService,
  loginSuccess,
  logout
} from '@workspace/frontend/data-access/auth';
import { DecodedJWT } from '@workspace/shared/data';

@Injectable()
export class UsersEffects {
  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(loginSuccess),
    map(() => UserActions.loadAuthUser())
  );

  @Effect()
  loadAuthUser$ = this.actions$.pipe(
    ofType(UserActions.loadAuthUser),

    /**
     * It is not be possible for the JWT to be undefined
     * as the resolver will run AFTER the AuthGuard runs,
     */
    map(action => this.jwtService.getDecodedToken() as DecodedJWT),
    switchMap(token =>
      this.usersService.getOneUser(token.sub).pipe(
        map(user => UserActions.loadAuthUserSuccess({ user })),
        catchError(error => of(UserActions.loadAuthUserFail({ error })))
      )
    )
  );

  @Effect()
  loadAuthUserSuccess$ = this.actions$.pipe(
    ofType(UserActions.loadAuthUserSuccess),
    map(user => UserActions.loadUserSuccess(user))
  );

  @Effect()
  selectAuthenticatedUser$ = this.actions$.pipe(
    ofType(UserActions.loadAuthUserSuccess),
    map(({ user }) => UserActions.selectAuthUser({ id: user.id }))
  );

  @Effect()
  clearAuthenticatedUser$ = this.actions$.pipe(
    ofType(logout),
    map(() => UserActions.clearAuthUser())
  );

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType(UserActions.loadUser),
    switchMap(({ id }) =>
      this.usersService.getOneUser(id).pipe(
        map(user => UserActions.loadUserSuccess({ user })),
        catchError(error => of(UserActions.loadUserFail({ error })))
      )
    )
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(UserActions.updateUser),
    mergeMap(({ user }) =>
      this.usersService.updateUser(user).pipe(
        map(updatedUser =>
          UserActions.updateUserSuccess({
            user: {
              id: updatedUser.id,
              changes: updatedUser
            }
          })
        ),
        catchError(error => of(UserActions.updateUserFail(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private jwtService: JWTAuthService
  ) {}
}
