import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  GraphQLService,
  ApiService
} from '@workspace/frontend/data-access/api';
import {
  ILoginCredentials,
  ILoginResponse,
  IRegistrationDetails,
  IUser
} from '@workspace/shared/interfaces';
import { isPasswordAllowed } from '@workspace/shared/utils/auth';
import { JWTAuthService } from './jwt-auth.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JWTAuthService,
    private graphQL: GraphQLService,
    private api: ApiService
  ) {}

  // Checks if the user is logged in
  checkUserIsLoggedIn(): boolean {
    const token = this.jwt.getAuthorizationToken();
    return token && this.jwt.checkTokenIsValid(token) ? true : false;
  }

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
    const variables = { input: details };
    return this.graphQL.mutation<{ register: IUser }>(query, {
      input: details
    });
  }

  public isUsernameAvailable(
    username: string
  ): Observable<{ isAvailable: boolean }> {
    return this.api.get<{ isAvailable: boolean }>(`users/available`, {
      username
    });
  }

  // A wrapper around the is password allowed method to create a form validator
  passwordValidator() {
    return (control: AbstractControl) => {
      const allowed = isPasswordAllowed(control.value);
      return allowed ? null : { forbiddenName: { value: control.value } };
    };
  }
}
