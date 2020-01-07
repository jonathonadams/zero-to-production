import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { IJWTPayload } from '../auth.interface';

@Injectable({ providedIn: 'root' })
export class JWTAuthService {
  readonly storageKey = 'access_token';
  constructor() {}

  setAuthorizationToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  removeAuthorizationToken(): void {
    localStorage.removeItem(this.storageKey);
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
