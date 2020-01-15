import { createReducer, on, Action } from '@ngrx/store';
import * as fromAuth from './auth.actions';
import { UsernameAvailable } from '../auth.interface';
import { IUser } from '@uqt/interfaces';

export const authStateKey = 'authStateKey';

export interface AuthState {
  isAuthenticated: boolean;
  expiresIn: number | null;
  user: IUser | null;
  available: UsernameAvailable | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  expiresIn: null,
  user: null,
  available: null
};

const authReducer = createReducer(
  initialState,
  on(fromAuth.loginSuccess, (state, { expiresIn }) => {
    return {
      ...state,
      isAuthenticated: true,
      expiresIn: new Date().valueOf() + 1000 * expiresIn // expiresIn will be in seconds
    };
  }),
  on(fromAuth.logout, state => {
    return { ...state, isAuthenticated: false };
  }),
  on(fromAuth.usernamePending, state => {
    return { ...state, available: UsernameAvailable.Pending };
  }),
  on(fromAuth.usernameAvailable, state => {
    return { ...state, available: UsernameAvailable.Available };
  }),
  on(fromAuth.usernameUnAvailable, state => {
    return { ...state, available: UsernameAvailable.UnAvailable };
  }),
  on(fromAuth.clearAvailable, state => {
    return { ...state, available: null };
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
