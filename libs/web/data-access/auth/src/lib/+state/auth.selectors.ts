import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthSate = createFeatureSelector<fromAuth.AuthState>(
  fromAuth.authStateKey
);

export const selectLoggedInStatus = createSelector(
  selectAuthSate,
  state => state.loggedIn
);

export const selectAvailability = createSelector(
  selectAuthSate,
  state => state.availability
);
