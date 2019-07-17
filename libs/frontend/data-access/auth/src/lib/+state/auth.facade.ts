import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ILoginCredentials } from '@workspace/shared/interfaces';

@Injectable()
export class AuthFacade {
  constructor(private store: Store<any>) {}

  login(credentials: ILoginCredentials): void {
    this.store.dispatch(AuthActions.login(credentials));
  }

  loginRedirect(): void {
    this.store.dispatch(AuthActions.loginRedirect());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
