import { Injectable, InjectionToken, Inject, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { IUser } from '@uqt/data';
import {
  ILoginCredentials,
  ILoginResponse,
  IRegistrationDetails,
  IJWTPayload
} from '../auth.interface';
import { HttpClient } from '@angular/common/http';
import { secondsToExpiresAtMillis } from '../utils';
import { AuthFacade } from '../+state/auth.facade';
import { isPlatformBrowser } from '@angular/common';

export const AUTH_SERVER_URL = new InjectionToken<string>(
  'forRoot() Auth Server Url'
);

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly storageKey = 'access_token';
  readonly sessionKey = 'expires_at';

  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    @Inject(AUTH_SERVER_URL) private authServerUrl: string,
    private apollo: Apollo,
    private facade: AuthFacade,
    private http: HttpClient
  ) {}

  // Login function that returns a user and JWT
  // This is a graphql login function
  login(credentials: ILoginCredentials) {
    const mutation = gql`
      mutation LoginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          expiresIn
        }
      }
    `;
    return this.apollo.mutate<{ login: ILoginResponse }>({
      mutation,
      variables: credentials
    });
  }

  register(details: IRegistrationDetails) {
    const mutation = gql`
      mutation Register($input: RegisterInput!) {
        register(input: $register) {
          id
        }
      }
    `;
    return this.apollo.mutate<{ register: IUser }>({
      mutation,
      variables: {
        input: details
      }
    });
  }

  loadUser(id: string) {
    const query = gql`
      query AuthUser($id: ID!) {
        User(id: $id) {
          id
          givenName
          surname
          email
          dateOfBirth
        }
      }
    `;

    return this.apollo.query<{ User: IUser }>({ query, variables: { id } });
  }

  // TODO -> Graphql?
  public isUsernameAvailable(
    username: string
  ): Observable<{ isAvailable: boolean }> {
    return this.http.get<{ isAvailable: boolean }>(
      `${this.authServerUrl}/authorize/available`,
      {
        headers: this.headers,
        params: { username }
      }
    );
  }

  get authToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  setSession({ token, expiresIn }: ILoginResponse): void {
    const expiresAt = secondsToExpiresAtMillis(expiresIn);
    localStorage.setItem(this.storageKey, token);
    localStorage.setItem(this.sessionKey, expiresAt.toString());
  }

  removeSession(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.sessionKey);
  }

  /**
   *
   * NOTE: Side Effect. Each time the isLoggedIn methods is called, it will synchronously update the redux store
   *
   * @memberof AuthService
   */
  public isLoggedIn(): void {
    if (isPlatformBrowser(this.platform)) {
      const expiration = this.expiration;
      const auth = expiration ? this.isAuthenticated(expiration) : false;

      if (auth) {
        this.facade.setAuthenticated(true, expiration);
      } else {
        this.removeSession();
        this.facade.setAuthenticated(false, null);
      }
    }
  }

  private get expiration(): number | null {
    const expiration: string | null = localStorage.getItem(this.sessionKey);
    return expiration ? Number(expiration) : null;
  }

  private isAuthenticated(expiration: number): boolean {
    return new Date().valueOf() < expiration;
  }

  get authUserId(): string | null {
    const token = this.authToken;
    return token !== null ? jwtDecode<IJWTPayload>(token).sub : null;
  }

  get headers() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}

export function authProviderFactory(service: AuthService) {
  return () => service.isLoggedIn();
}
