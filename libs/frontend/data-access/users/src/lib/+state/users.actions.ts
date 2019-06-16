import { Action } from '@ngrx/store';
import { ActionWithPayload, User } from '@workspace/shared/data';

export enum UserActionTypes {
  Load = '[User] Load',
  LoadSuccess = '[User] Load Success',
  LoadFail = '[User] Load Fail',
  LoadAll = '[User] Load All',
  LoadAllSuccess = '[User] Load All Success',
  LoadAllFail = '[User] Load All Fail',
  Create = '[User] Create',
  CreateSuccess = '[User] Create Success',
  CreateFail = '[User] Create Fail',
  Update = '[User] Update',
  UpdateSuccess = '[User] Update Success',
  UpdateFail = '[User] Update Fail',
  Delete = '[User] Delete',
  DeleteSuccess = '[User] Delete Success',
  DeleteFail = '[User] Delete Fail',
  Select = '[User] Select',
  ClearSelected = '[User] Clear Selected'
}

export class SelectUser implements ActionWithPayload<string> {
  readonly type = UserActionTypes.Select;
  constructor(public payload: string) {}
}

export class ClearSelectedUser implements Action {
  readonly type = UserActionTypes.ClearSelected;
}

/**
 * Load user actions
 */
export class LoadUser implements ActionWithPayload<string | number> {
  readonly type = UserActionTypes.Load;
  constructor(readonly payload: string | number) {}
}

export class LoadUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.LoadSuccess;
  constructor(readonly payload: User) {}
}

export class LoadUserFail implements ActionWithPayload<Error> {
  readonly type = UserActionTypes.LoadFail;
  constructor(readonly payload: Error) {}
}

export class LoadAllUsers implements Action {
  readonly type = UserActionTypes.LoadAll;
}

export class LoadAllUsersSuccess implements ActionWithPayload<User[]> {
  readonly type = UserActionTypes.LoadAllSuccess;
  constructor(readonly payload: User[]) {}
}

export class LoadAllUsersFail implements ActionWithPayload<Error> {
  readonly type = UserActionTypes.LoadAllFail;
  constructor(readonly payload: Error) {}
}

/**
 * Create User actions
 */

export class CreateUser implements ActionWithPayload<User> {
  readonly type = UserActionTypes.Create;
  constructor(public payload: User) {}
}

export class CreateUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.CreateSuccess;
  constructor(public payload: User) {}
}

export class CreateUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.CreateFail;
  constructor(public payload: User) {}
}

/**
 * Update User actions
 */

export class UpdateUser implements ActionWithPayload<User> {
  readonly type = UserActionTypes.Update;
  constructor(public payload: User) {}
}

export class UpdateUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.UpdateSuccess;
  constructor(public payload: User) {}
}

export class UpdateUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.UpdateFail;
  constructor(public payload: User) {}
}

/**
 * Delete User actions
 */

export class DeleteUser implements ActionWithPayload<User> {
  readonly type = UserActionTypes.Delete;
  constructor(public payload: User) {}
}

export class DeleteUserSuccess implements ActionWithPayload<User> {
  readonly type = UserActionTypes.DeleteSuccess;
  constructor(public payload: User) {}
}

export class DeleteUserFail implements ActionWithPayload<User> {
  readonly type = UserActionTypes.DeleteFail;
  constructor(public payload: User) {}
}

export type UserActionUnion =
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail
  | LoadAllUsers
  | LoadAllUsersSuccess
  | LoadAllUsersFail
  | CreateUser
  | CreateUserSuccess
  | CreateUserFail
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail;
