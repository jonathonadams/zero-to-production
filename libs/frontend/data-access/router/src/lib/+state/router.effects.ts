import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as RouterActions from './router.actions';

@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.action$.pipe(
    ofType(RouterActions.navigate),
    tap(({ path, query: queryParams }) =>
      this.router.navigate(path, { queryParams })
    )
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.action$.pipe(
    ofType(RouterActions.navigateBack),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.action$.pipe(
    ofType(RouterActions.navigateForward),
    tap(() => this.location.forward())
  );

  constructor(
    private action$: Actions,
    private router: Router,
    private location: Location
  ) {}
}
