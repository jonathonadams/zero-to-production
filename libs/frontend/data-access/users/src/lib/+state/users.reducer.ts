import { User } from '@workspace/shared/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { UserActionUnion, UserActionTypes } from './users.actions';

export interface UsersEntityState extends EntityState<User> {
  selectedUserId: string | null;
}

const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initialSate: UsersEntityState = adapter.getInitialState({
  selectedUserId: null,
  authUserId: null
});

export function usersReducer(
  state: UsersEntityState = initialSate,
  action: UserActionUnion
): UsersEntityState {
  switch (action.type) {
    case UserActionTypes.LoadAllSuccess:
      return adapter.addAll(action.payload, state);

    case UserActionTypes.LoadSuccess:
      return adapter.addOne(action.payload, state);

    case UserActionTypes.CreateSuccess:
      return adapter.addOne(action.payload, state);

    case UserActionTypes.UpdateSuccess:
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state
      );
    case UserActionTypes.DeleteSuccess:
      return adapter.removeOne(action.payload.id, state);

    default:
      return state;
  }
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
