import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '@workspace/shared/data';
import { ThemeService } from '@workspace/frontend/common/theme';
import { selectAuthUser } from './auth-user.reducer';
import { loadAuthUser } from './auth-user.actions';

@Injectable()
export class AuthUserFacade {
  public authUser$: Observable<User | undefined>;

  constructor(private store: Store<any>, private theme: ThemeService) {
    this.authUser$ = this.store.pipe(
      select(selectAuthUser),
      tap(user => this.theme.setUserSettings(user))
    );
  }

  loadAuthUser() {
    this.store.dispatch(loadAuthUser());
  }
}
