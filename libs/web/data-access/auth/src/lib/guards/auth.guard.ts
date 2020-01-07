import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../+state/auth.facade';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private facade: AuthFacade) {}

  canActivate() {
    if (this.auth.checkUserIsLoggedIn()) {
      return true;
    } else {
      this.facade.logout();
      return false;
    }
  }
}
