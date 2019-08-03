import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { LocalStorageService } from '@ngw/frontend/utils/storage';
import { IJWTPayload } from '@ngw/shared/interfaces';

@Injectable()
export class JWTAuthService {
  readonly storageKey = 'access_token';
  constructor(private ls: LocalStorageService) {}

  setAuthorizationToken(token: string): void {
    this.ls.setItem(this.storageKey, token);
  }

  getAuthorizationToken(): string | null {
    return this.ls.getItem<string>(this.storageKey);
  }

  removeAuthorizationToken(): void {
    this.ls.removeItem(this.storageKey);
  }

  decodeToken(token: string): IJWTPayload {
    return jwtDecode<IJWTPayload>(token);
  }

  getDecodedToken(): IJWTPayload | undefined {
    const token = this.getAuthorizationToken();
    if (token !== null) {
      return this.decodeToken(token);
    }
  }

  checkTokenIsValid(token: string): boolean {
    const now = Math.floor(Date.now() / 1000);
    const expTime: number = this.decodeToken(token).exp;
    return now < expTime ? true : false;
  }
}
