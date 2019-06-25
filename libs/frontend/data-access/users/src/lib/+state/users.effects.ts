import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserActions from './users.actions';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
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

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
