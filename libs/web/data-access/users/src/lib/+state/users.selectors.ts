import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUserState = createFeatureSelector<
  fromUsers.UsersEntityState
>(fromUsers.usersEntityStateKey);

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers
} = fromUsers.adapter.getSelectors(selectUserState);

export const selectCurrentUserId = createSelector(
  selectUserState,
  (state: fromUsers.UsersEntityState) => state.selectedUserId
);
export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[`${userId}`]
);

export const selectAuthUserId = createSelector(
  selectUserState,
  state => state.authUserId
);
export const selectAuthUser = createSelector(
  selectUserEntities,
  selectAuthUserId,
  (userEntities, id) => userEntities[`${id}`]
);
