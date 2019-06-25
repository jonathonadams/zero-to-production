import { createAction, props } from '@ngrx/store';
import { GraphQLError } from 'graphql';
import { LoginCredentials, LoginResponse } from '@workspace/shared/data';

export const loginRedirect = createAction('[Auth] Login Redirect');

export const logoutRedirect = createAction('[Auth] Logout Redirect');

export const login = createAction(
  '[Auth/API] Login',
  props<LoginCredentials>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<LoginResponse>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: Error | GraphQLError }>()
);

export const logout = createAction('[Auth] Logout');
