import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs';
// @ts-ignore
import jwtDecode from 'jwt-decode';
import { GraphQLService } from '@uqt/data-access/api';
import { IUser } from '@uqt/interfaces';
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
    const query = `
      mutation LoginUser($username: String!, $password: String!){
        login(username: $username, password: $password){
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
    const query = `
      mutation Register($input: RegisterInput!) {
        register(input: $input) {
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

  // setAuthToken(token: string): void {
  //   localStorage.setItem(this.storageKey, token);
  // }

  get authToken(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  // Checks if the user is logged in
  // checkUserIsLoggedIn(): boolean {
  //   const token = this.authToken;
  //   return token && this.checkTokenIsValid(token) ? true : false;
  // }

  // removeToken(): void {
  //   localStorage.removeItem(this.storageKey);
  // }

  // decodeToken(token: string): IJWTPayload {
  //   return jwtDecode<IJWTPayload>(token);
  // }

  // get decodedToken(): IJWTPayload | undefined {
  //   const token = this.authToken;
  //   if (token !== null) {
  //     return this.decodeToken(token);
  //   }
  // }

  // checkTokenIsValid(token: string): boolean {
  //   const now = Math.floor(Date.now() / 1000);
  //   const expTime: number = this.decodeToken(token).exp;
  //   return now < expTime ? true : false;
  // }

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
    if (expiration) {
      const isAuthenticated: boolean = new Date().valueOf() < expiration;
      if (isAuthenticated) {
        this.facade.setAuthenticated(isAuthenticated, expiration);
      } else {
        this.removeSession();
        this.facade.setAuthenticated(isAuthenticated, null);
      }
    }
  }

  private get expiration(): number | null {
    const expiresAt: string | null = localStorage.getItem(this.sessionKey);
    return expiresAt ? Number(expiresAt) : null;
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
