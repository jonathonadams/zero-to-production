import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Login, Logout, LoginRedirect } from './auth.actions';
import { LoginCredentials } from '@workspace/shared/data';

@Injectable()
export class AuthFacade {
  constructor(private store: Store<any>) {}

  login(credentials: LoginCredentials): void {
    this.store.dispatch(new Login(credentials));
  }

  loginRedirect(): void {
    this.store.dispatch(new LoginRedirect());
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
