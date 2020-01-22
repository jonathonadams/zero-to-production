import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IUser } from '@uqt/interfaces';

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
  props<{ user: IUser }>()
);

export const loadAuthUserFail = createAction(
  '[User/API] Load Auth Fail',
  props<{ error: string }>()
);

export const loadUser = createAction(
  '[User/API] Load User',
  props<{ id: string }>()
);

export const loadUserSuccess = createAction(
  '[User/API] Load User Success',
  props<{ user: IUser }>()
);

export const loadUserFail = createAction(
  '[User/API] Load User Fail',
  props<{ error: string }>()
);

export const loadUsers = createAction('[User/API] Load Users');

export const loadUsersSuccess = createAction(
  '[User/API] Load Success',
  props<{ users: IUser[] }>()
);

export const loadUsersFail = createAction(
  '[User/API] Load Fail',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[User/API] Create ',
  props<{ user: IUser }>()
);
export const createUserSuccess = createAction(
  '[User/API] Create Success',
  props<{ user: IUser }>()
);

export const createUserFail = createAction(
  '[User/API] Create Fail',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User/API] Update ',
  props<{ user: IUser }>()
);
export const updateUserSuccess = createAction(
  '[User/API] Update Success',
  props<{ user: Update<IUser> }>()
);

export const updateUserFail = createAction(
  '[User/API] Update Fail',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[User/API] Delete',
  props<{ user: IUser }>()
);

export const deleteUserSuccess = createAction(
  '[User/API] Delete Success',
  props<{ id: string }>()
);

export const deleteUserFail = createAction(
  '[User/API] Delete Fail',
  props<{ error: string }>()
);

export const clearUsers = createAction('[User/API] Clear');
