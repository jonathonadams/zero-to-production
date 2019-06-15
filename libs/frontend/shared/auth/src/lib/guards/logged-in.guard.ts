import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private facade: AuthFacade) {}

  canActivate(): boolean | UrlTree {
    /**
     * If the user is logged in, redirect to the home page
     */
    if (this.auth.checkUserIsLoggedIn()) {
      this.facade.loginRedirect();
      return false;
    } else {
      return true;
    }
  }
}
