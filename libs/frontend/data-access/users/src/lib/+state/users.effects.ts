import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  UserActionTypes,
  UpdateUser,
  UpdateUserSuccess,
  UpdateUserFail,
  LoadUser,
  LoadUserFail,
  LoadUserSuccess
} from './users.actions';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType<LoadUser>(UserActionTypes.Load),
    map(action => action.payload),
    switchMap(userId =>
      this.usersService.getOneUser(userId).pipe(
        map(user => new LoadUserSuccess(user)),
        catchError(error => of(new LoadUserFail(error)))
      )
    )
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType<UpdateUser>(UserActionTypes.Update),
    mergeMap(action =>
      this.usersService.updateUser(action.payload).pipe(
        map(updatedUser => new UpdateUserSuccess(updatedUser)),
        catchError(error => of(new UpdateUserFail(error)))
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
