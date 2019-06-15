import { Action } from '@ngrx/store';
import { ActionWithPayload } from 'typings/actions';
import { LoginCredentials, LoginResponse } from 'typings/auth';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  Logout = '[Auth] Logout',
  LogoutRedirect = '[Auth] Logout Redirect'
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class LogoutRedirect implements Action {
  readonly type = AuthActionTypes.LogoutRedirect;
}

export class Login implements ActionWithPayload<LoginCredentials> {
  readonly type = AuthActionTypes.Login;
  constructor(readonly payload: LoginCredentials) {}
}

export class LoginSuccess implements ActionWithPayload<LoginResponse> {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(readonly payload: { token: string }) {}
}

export class LoginFailure implements ActionWithPayload<Error> {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(readonly payload: Error) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | LoginSuccess
  | LoginRedirect
  | LoginFailure
  | Logout
  | LogoutRedirect;
