import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as UserActions from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap(({ id }) =>
        this.usersService.getOneUser(id).pipe(
          map((user) => UserActions.loadUserSuccess({ user })),
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
          map((updatedUser) =>
            UserActions.updateUserSuccess({
              user: {
                id: updatedUser.id,
                changes: updatedUser,
              },
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(UserActions.updateUserFail({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
