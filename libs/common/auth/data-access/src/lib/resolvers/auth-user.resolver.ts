import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter, tap } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { IUser } from '@ztp/data';
import { AuthFacade } from '../+state/auth.facade';

@Injectable({ providedIn: 'root' })
export class AuthUsersResolver implements Resolve<IUser | null> {
  constructor(private facade: AuthFacade) {}

  resolve(): Observable<IUser | null> {
    /**
     * The resolver function checks to see if the the user is defined,
     * if it is not defined then it will attempt to load the authenticated
     * user from the JWT stored in local storage. This handles cases such
     * as when the page is refreshed and the user does not have to authenticate
     * again.It also filters out the scenario where the current user is not
     * the current authenticated user, i.e. logout and then log back in
     */
    return this.facade.user$.pipe(
      tap((user) => (!user ? this.facade.loadLoggedInUser() : undefined)),
      filter((user) => user !== undefined),
      take(1)
    );
  }
}
