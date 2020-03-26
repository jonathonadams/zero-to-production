import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private facade: AuthFacade) {}

  canActivate(): Observable<boolean> {
    // check and update the store
    this.auth.isLoggedIn();

    return this.facade.isAuthenticated$.pipe(
      tap((loggedIn) => (loggedIn ? this.facade.loginRedirect() : undefined)),
      map((loggedIn) => !loggedIn)
    );
  }
}
