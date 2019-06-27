import { User } from '@workspace/shared/data';
import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as UserActions from './users.actions';

export interface UsersEntityState extends EntityState<User> {
  selectedUserId: string | null;
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialSate: UsersEntityState = adapter.getInitialState({
  selectedUserId: null,
  authUserId: null
});

export const usersReducer = createReducer(
  initialSate,
  on(UserActions.selectUser, (state, { id }) => {
    return { ...state, selectedUserId: id };
  }),
  on(UserActions.clearSelected, state => {
    return { ...state, selectedUserId: null };
  }),
  on(UserActions.loadUsersSuccess, (state, { users }) => {
    return adapter.addAll(users, state);
  }),
  on(UserActions.loadUserSuccess, (state, { user }) => {
    return adapter.addOne(user, state);
  }),
  on(UserActions.createUserSuccess, (state, { user }) => {
    return adapter.addOne(user, state);
  }),
  on(UserActions.updateUserSuccess, (state, { user }) => {
    return adapter.updateOne(user, state);
  }),
  on(UserActions.deleteUserSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  })
);

export function reducer(state: UsersEntityState | undefined, action: Action) {
  return usersReducer(state, action);
}

export const selectUserState = createFeatureSelector<UsersEntityState>(
  'usersState'
);

export const {
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers
} = adapter.getSelectors(selectUserState);

export const selectCurrentUserId = createSelector(
  selectUserState,
  (state: UsersEntityState) => state.selectedUserId
);
export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[`${userId}`] // TODO  -> Is the coercion necessary? For TS to be strict it has to be
);
