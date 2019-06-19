import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '@workspace/shared/data';
import {
  LoadAllUsers,
  SelectUser,
  ClearSelectedUser,
  UpdateUser,
  DeleteUser
} from './users.actions';
import {
  selectAllUsers,
  selectCurrentUser,
  selectUserEntities
} from './users.reducer';

@Injectable()
export class UsersFacade {
  user$: Observable<User[]>;
  selectedUser$: Observable<User | undefined>;
  userEntities$: Observable<any>;

  constructor(private store: Store<any>) {
    this.user$ = this.store.pipe(select(selectAllUsers));
    this.selectedUser$ = this.store.pipe(select(selectCurrentUser));
    this.userEntities$ = this.store.pipe(select(selectUserEntities));
  }

  loadUsers() {
    this.store.dispatch(new LoadAllUsers());
  }

  selectUser(user: User) {
    this.store.dispatch(new SelectUser(user.id));
  }

  clearSelected() {
    this.store.dispatch(new ClearSelectedUser());
  }

  updateUser(user: User) {
    this.store.dispatch(new UpdateUser(user));
  }

  deleteUser(user: User) {
    this.store.dispatch(new DeleteUser(user));
  }
}
