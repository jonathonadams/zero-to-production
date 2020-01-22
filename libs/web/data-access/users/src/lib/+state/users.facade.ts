import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IUser } from '@uqt/interfaces';
import * as UserActions from './users.actions';
import * as fromUsers from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  user$: Observable<IUser[]>;
  selectedUser$: Observable<IUser | undefined>;
  authUser$: Observable<IUser | undefined>;

  constructor(private store: Store<any>) {
    this.user$ = this.store.pipe(select(fromUsers.selectAllUsers));
    this.selectedUser$ = this.store.pipe(select(fromUsers.selectCurrentUser));
    this.authUser$ = this.store.pipe(select(fromUsers.selectAuthUser));
  }

  loadAuthUser() {
    this.store.dispatch(UserActions.loadAuthUser());
  }

  loadUsers() {
    this.store.dispatch(UserActions.loadUsers());
  }

  selectUser(user: IUser) {
    this.store.dispatch(UserActions.selectUser({ id: user.id }));
  }

  clearSelected() {
    this.store.dispatch(UserActions.clearSelected());
  }

  updateUser(user: IUser) {
    this.store.dispatch(UserActions.updateUser({ user }));
  }

  deleteUser(user: IUser) {
    this.store.dispatch(UserActions.deleteUser({ user }));
  }
}
