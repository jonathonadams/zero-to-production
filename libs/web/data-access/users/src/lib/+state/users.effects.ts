import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  mergeMap,
  exhaustMap,
  takeUntil
} from 'rxjs/operators';
import {
  Actions,
  ofType,
  createEffect,
  EffectNotification,
  OnRunEffects
} from '@ngrx/effects';
import { AuthActions, IJWTPayload, AuthService } from '@uqt/data-access/auth';
import * as UserActions from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects implements OnRunEffects {
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(() => UserActions.loadAuthUser())
    )
  );

  loadAuthUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAuthUser),

      /**
       * It is not be possible for the JWT to be undefined
       * as the resolver will run AFTER the AuthGuard runs,
       */
      map(action => this.authService.getDecodedToken() as IJWTPayload),
      switchMap(token =>
        this.usersService.getOneUser(token.sub).pipe(
          map(user => UserActions.loadAuthUserSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loadAuthUserFail({ error: error.message }))
          )
        )
      )
    )
  );

  loadAuthUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAuthUserSuccess),
      map(user => UserActions.loadUserSuccess(user))
    )
  );

  selectAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAuthUserSuccess),
      map(({ user }) => UserActions.selectAuthUser({ id: user.id }))
    )
  );

  clearAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => UserActions.clearAuthUser())
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(({ id }) =>
        this.usersService.getOneUser(id).pipe(
          map(user => UserActions.loadUserSuccess({ user })),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.loadUserFail({ error: error.message }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
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
          catchError((error: HttpErrorResponse) =>
            of(UserActions.updateUserFail({ error: error.message }))
          )
        )
      )
    )
  );

  // Clear the user todos on logout
  clearUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => UserActions.clearUsers())
    );
  });

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType(AuthActions.logout)))
        )
      )
    );
  }

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private authService: AuthService
  ) {}
}
