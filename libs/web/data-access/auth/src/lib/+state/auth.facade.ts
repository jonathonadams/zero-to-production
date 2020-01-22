import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.selectors';
import { ILoginCredentials, IRegistrationDetails } from '../auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  isAuthenticated$: Observable<boolean>;
  // Username
  isAvailable$: Observable<boolean | null | 'pending'>;

  constructor(private store: Store<any>) {
    this.isAuthenticated$ = this.store.pipe(
      select(fromAuth.selectIsAuthenticated)
    );
    this.isAvailable$ = this.store.pipe(select(fromAuth.selectIsAvailable));
  }

  login(credentials: ILoginCredentials): void {
    this.store.dispatch(AuthActions.login(credentials));
  }

  register(userDetails: IRegistrationDetails) {
    this.store.dispatch(AuthActions.register({ details: userDetails }));
  }

  loginRedirect(): void {
    this.store.dispatch(AuthActions.loginRedirect());
  }

  registerRedirect(): void {
    this.store.dispatch(AuthActions.registerRedirect());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  setAuthenticated(isAuthenticated: boolean, expiresAt: number | null) {
    this.store.dispatch(
      AuthActions.setAuthenticated({ isAuthenticated, expiresAt })
    );
  }

  usernamePending() {
    this.store.dispatch(AuthActions.usernamePending());
  }

  usernameAvailable(isAvailable: { isAvailable: boolean }) {
    this.store.dispatch(AuthActions.usernameAvailable(isAvailable));
  }

  clearAvailable() {
    this.store.dispatch(AuthActions.clearAvailable());
  }
}
