import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from './auth.actions';
import * as fromAuth from './auth.selectors';
import {
  ILoginCredentials,
  IRegistrationDetails,
  AvailableStatus
} from '../auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  loggedInStatus$: Observable<boolean>;
  usernameAvailability$: Observable<AvailableStatus | null>;

  constructor(private store: Store<any>) {
    this.loggedInStatus$ = this.store.pipe(
      select(fromAuth.selectLoggedInStatus)
    );
    this.usernameAvailability$ = this.store.pipe(
      select(fromAuth.selectAvailability)
    );
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

  usernamePending() {
    this.store.dispatch(AuthActions.usernamePending());
  }

  usernameAvailable() {
    this.store.dispatch(AuthActions.usernameAvailable());
  }

  usernameUnAvailable() {
    this.store.dispatch(AuthActions.usernameUnAvailable());
  }

  clearAvailable() {
    this.store.dispatch(AuthActions.clearAvailability());
  }
}
