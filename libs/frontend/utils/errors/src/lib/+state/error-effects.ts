import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpErrorAction, ErrorActions } from './error.actions';
import { NotificationService } from '@workspace/frontend/utils/notifications';

@Injectable()
export class ErrorEffects {
  constructor(private actions$: Actions, private ns: NotificationService) {}

  @Effect({ dispatch: false })
  httpError$ = this.actions$.pipe(
    ofType<HttpErrorAction>(ErrorActions.Http),
    map(action => action.payload),
    tap(() => this.ns.emit('An error has occurred.')),
    map(error => console.log(error))
  );
}
