import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '@workspace/shared/data';
import * as UserActions from './users.actions';
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
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(user: User) {
    this.store.dispatch(UserActions.selectUser({ id: user.id }));
  }

  clearSelected() {
    this.store.dispatch(UserActions.clearSelected());
  }

  updateUser(user: User) {
    this.store.dispatch(UserActions.updateUser({ user }));
  }

  deleteUser(user: User) {
    this.store.dispatch(UserActions.deleteUser({ user }));
  }
}
