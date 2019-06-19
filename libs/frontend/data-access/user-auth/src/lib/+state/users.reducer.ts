import {
  createSelector,
  createFeatureSelector,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import * as UserAuthActions from './users.actions';
import { selectUserEntities } from '@workspace/frontend/data-access/users';

export interface AuthUserSate {
  authUserId: string | number | null;
}

const initialSate: AuthUserSate = {
  authUserId: null
};

export const userAuthReducer = createReducer(
  initialSate,
  on(UserAuthActions.selectAuthUser, (state, { id }) => {
    return { authUserId: id };
  }),
  on(UserAuthActions.clearAuthUser, state => {
    return state;
  })
);

export function reducer(state: AuthUserSate | undefined, action: Action) {
  return userAuthReducer(state, action);
}

export const selectAuthState = createFeatureSelector<AuthUserSate>('authUser');

export const selectAuthUserId = createSelector(
  selectAuthState,
  (state: AuthUserSate) => state.authUserId
);
export const selectAuthUser = createSelector(
  selectUserEntities,
  selectAuthUserId,
  (userEntities, id) => userEntities[`${id}`] // TODO -> don't cast?
);
