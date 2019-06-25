export class AuthStubs {
  setAuthorizationToken(token: string): void {}

  getAuthorizationToken(): string {
    return 'token';
  }

  tokenIsValid(token: string): boolean {
    return true;
  }

  userIsLoggedIn(): boolean {
    return true;
  }

  userIsAdmin(): boolean {
    return true;
  }

  logout(): void {}
}
