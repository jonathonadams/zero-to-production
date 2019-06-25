import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { GraphQLService } from '@workspace/frontend/data-access/api';
import { LoginCredentials, LoginResponse } from '@workspace/shared/data';
import { isPasswordAllowed } from '@workspace/shared/utils/auth';
import { JWTAuthService } from './jwt-auth.service';

@Injectable()
export class AuthService {
  constructor(private jwt: JWTAuthService, private graphQL: GraphQLService) {}

  // Checks if the user is logged in
  checkUserIsLoggedIn(): boolean {
    const token = this.jwt.getAuthorizationToken();
    return token && this.jwt.checkTokenIsValid(token) ? true : false;
  }

  // Login function that returns a user and JWT
  // This is a graphql login function
  login(credentials: LoginCredentials) {
    const query = `
      mutation LoginUser($username: String!, $password: String!){
        login(username: $username, password: $password){
          token
        }
      }
    `;
    return this.graphQL.mutation<{ data: { login: LoginResponse } }>(
      query,
      credentials
    );
  }

  // swap out for a REST login function
  // login(credentials: LoginCredentials): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${environment.serverUrl}/authorize`, credentials);
  // }

  // A wrapper around the is password allowed method to create a form validator
  passwordValidator() {
    return (control: AbstractControl) => {
      const allowed = isPasswordAllowed(control.value);
      return allowed ? null : { forbiddenName: { value: control.value } };
    };
  }
}
