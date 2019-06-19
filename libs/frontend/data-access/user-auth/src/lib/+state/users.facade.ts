import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@workspace/shared/data';
import { selectAuthUser } from './users.reducer';
import { loadAuthUser } from './users.actions';

@Injectable()
export class AuthUserFacade {
  public authUser$: Observable<User | undefined>;

  constructor(private store: Store<any>) {
    this.authUser$ = this.store.pipe(select(selectAuthUser));
  }

  loadAuthUser() {
    this.store.dispatch(loadAuthUser());
  }
}
