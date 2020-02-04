import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { NotificationService } from '@uqt/utils/notifications';
import { AuthActions } from '@uqt/shared/data-access/auth';
import { GraphQLService } from '@uqt/shared/data-access/api';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {
  loginRedirects$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect),
        tap(() => this.router.navigate(['examples', 'demos', 'secure', 'home']))
      ),
    { dispatch: false }
  );

  registerRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerRedirect),
        tap(() =>
          this.router.navigate(['examples', 'demos', 'secure', 'register'])
        )
      ),
    { dispatch: false }
  );

  logoutRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutRedirect),
        tap(action => this.graphql.clearCache()),
        tap(() =>
          this.router.navigate(['examples', 'demos', 'secure', 'login'])
        )
      ),
    { dispatch: false }
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

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => this.ns.emit('Registration Successful. Please log in.'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private graphql: GraphQLService,
    private ns: NotificationService
  ) {}
}
