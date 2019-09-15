import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthSate = createFeatureSelector<AuthState>('authState');

export const selectLoggedInStatus = createSelector(
  selectAuthSate,
  state => state.loggedIn
);

export const selectAvailability = createSelector(
  selectAuthSate,
  state => state.availability
);
