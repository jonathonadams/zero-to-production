import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  loginRedirect,
  logoutRedirect,
  registerRedirect
} from '@uqt/data-access/auth';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppEffects {
  @Effect({ dispatch: false })
  loginRedirects$ = this.action$.pipe(
    ofType(loginRedirect),
    tap(() => this.router.navigate(['secure', 'home']))
  );

  @Effect({ dispatch: false })
  registerRedirect$ = this.action$.pipe(
    ofType(registerRedirect),
    tap(() => this.router.navigate(['secure', 'register']))
  );

  @Effect({ dispatch: false })
  logoutRedirect$ = this.action$.pipe(
    ofType(logoutRedirect),
    tap(() => this.router.navigate(['secure', 'login']))
  );
  constructor(private action$: Actions, private router: Router) {}
}
