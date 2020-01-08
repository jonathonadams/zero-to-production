import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { GraphQLService, ApiService } from '@uqt/data-access/api';
import { IUser } from '@uqt/interfaces';
import {
  ILoginCredentials,
  ILoginResponse,
  IRegistrationDetails,
  IJWTPayload
} from '../auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly storageKey = 'access_token';
  constructor(private graphQL: GraphQLService, private api: ApiService) {}

  // Login function that returns a user and JWT
  // This is a graphql login function
  login(credentials: ILoginCredentials) {
    const query = `
      mutation LoginUser($username: String!, $password: String!){
        login(username: $username, password: $password){
          token
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
      mutation Register($input: NewUserInput!) {
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
    return this.api.get<{ isAvailable: boolean }>(`users/available`, {
      username
    });
  }

  // Checks if the user is logged in
  checkUserIsLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    return token && this.checkTokenIsValid(token) ? true : false;
  }

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
