import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { LoginCredentials } from '@workspace/shared/interfaces';

@Injectable()
export class AuthFacade {
  constructor(private store: Store<any>) {}

  login(credentials: LoginCredentials): void {
    this.store.dispatch(AuthActions.login(credentials));
  }

  loginRedirect(): void {
    this.store.dispatch(AuthActions.loginRedirect());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
