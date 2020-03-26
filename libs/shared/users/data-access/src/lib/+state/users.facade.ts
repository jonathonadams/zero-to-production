import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IUser } from '@ztp/data';
import * as UserActions from './users.actions';
import * as fromUsers from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  user$: Observable<IUser[]>;
  selectedUser$: Observable<IUser | undefined>;

  constructor(private store: Store<any>) {
    this.user$ = this.store.pipe(select(fromUsers.selectAllUsers));
    this.selectedUser$ = this.store.pipe(select(fromUsers.selectCurrentUser));
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
