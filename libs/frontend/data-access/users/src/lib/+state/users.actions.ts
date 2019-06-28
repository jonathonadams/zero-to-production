import { createAction, props } from '@ngrx/store';
import { User } from '@workspace/shared/data';
import { GraphQLError } from 'graphql';
import { Update } from '@ngrx/entity';

export const selectUser = createAction(
  '[User/UI] Select',
  props<{ id: string }>()
);

export const clearSelected = createAction('[User/UI] Clear');

export const selectAuthUser = createAction(
  '[User/UI] Select Auth',
  props<{ id: string }>()
);

export const clearAuthUser = createAction('[User/UI] Clear Auth');

export const loadAuthUser = createAction('[User/API] Load Auth');

export const loadAuthUserSuccess = createAction(
  '[User/API] Load Auth Success',
  props<{ user: User }>()
);

export const loadAuthUserFail = createAction(
  '[User/API] Load Auth Fail',
  props<{ error: GraphQLError | Error }>()
);

export const loadUser = createAction(
  '[User/API] Load User',
  props<{ id: string }>()
);

export const loadUserSuccess = createAction(
  '[User/API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFail = createAction(
  '[User/API] Load User Fail',
  props<{ error: GraphQLError | Error }>()
);

export const loadUsers = createAction('[User/API] Load Users');

export const loadUsersSuccess = createAction(
  '[User/API] Load Success',
  props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
  '[User/API] Load Fail',
  props<{ error: GraphQLError | Error }>()
);

export const createUser = createAction(
  '[User/API] Create ',
  props<{ user: User }>()
);
export const createUserSuccess = createAction(
  '[User/API] Create Success',
  props<{ user: User }>()
);

export const createUserFail = createAction(
  '[User/API] Create Fail',
  props<{ error: GraphQLError }>()
);

export const updateUser = createAction(
  '[User/API] Update ',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[User/API] Update Success',
  props<{ user: Update<User> }>()
);

export const updateUserFail = createAction(
  '[User/API] Update Fail',
  props<{ error: GraphQLError }>()
);

export const deleteUser = createAction(
  '[User/API] Delete',
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
  '[User/API] Delete Success',
  props<{ id: string }>()
);

export const deleteUserFail = createAction(
  '[User/API] Delete Fail',
  props<{ error: GraphQLError }>()
);
