import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter, tap } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { AuthUserFacade } from './+state/auth-user.facade';
import { User } from '@workspace/shared/data';

@Injectable()
export class AuthUsersResolver implements Resolve<User | undefined> {
  constructor(private facade: AuthUserFacade) {}

  resolve(): Observable<User | undefined> {
    /**
     * The resolver function checks to see if the the user is defined,
     * if it is not defined then it will attempt to load the authenticated
     * user from the JWT stored in local storage. This handles cased such
     * as when the page is refreshed and the user does not have to authenticate
     * again.It also filters out the scenario where the current user is not
     * the current authenticated user, i.e. logout and then log back in
     */
    return this.facade.authUser$.pipe(
      tap(user => (!user ? this.facade.loadAuthUser() : undefined)),
      filter(user => user !== undefined),
      take(1)
    );
  }
}
