import { createAction, props } from '@ngrx/store';
import { GraphQLError } from 'graphql';
import {
  ILoginCredentials,
  ILoginResponse
} from '@workspace/shared/interfaces';

export const loginRedirect = createAction('[Auth] Login Redirect');

export const logoutRedirect = createAction('[Auth] Logout Redirect');

export const login = createAction(
  '[Auth/API] Login',
  props<ILoginCredentials>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<ILoginResponse>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
