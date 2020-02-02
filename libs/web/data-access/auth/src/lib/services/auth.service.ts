import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import gql from 'graphql-tag';
import { GraphQLService } from '@uqt/data-access/api';
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

export const AUTH_SERVER_URL = new InjectionToken<string>(
  'forRoot() Auth Server Url'
);

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly storageKey = 'access_token';
  readonly sessionKey = 'expires_at';

  constructor(
    @Inject(AUTH_SERVER_URL) private authServerUrl: string,
    private graphQL: GraphQLService,
    private facade: AuthFacade,
    private http: HttpClient
  ) {
    // On create (page refresh/load), update the redux store
    this.isLoggedIn();
  }

  // Login function that returns a user and JWT
  // This is a graphql login function
  login(credentials: ILoginCredentials) {
    const query = gql`
      mutation LoginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
          expiresIn
        }
      }
    `;
    return this.graphQL.mutation<{ login: ILoginResponse }>(query, credentials);
  }

  // swap out for a REST login function
  // login(credentials: LoginCredentials): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${environment.serverUrl}/authorize`, credentials);
  // }

  register(details: IRegistrationDetails) {
    const query = gql`
      mutation Register($input: RegisterInput!) {
        register(input: $register) {
          id
        }
      }
    `;
    return this.graphQL.mutation<{ register: IUser }>(query, {
      input: details
    });
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
    const expiration = this.expiration;
    const auth = expiration ? this.isAuthenticated(expiration) : false;

    if (auth) {
      this.facade.setAuthenticated(true, expiration);
    } else {
      this.removeSession();
      this.facade.setAuthenticated(false, null);
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
