import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '@workspace/shared/data';
import { UsersFacade } from '@workspace/frontend/data-access/users';
import { ThemeService } from './theme.service';

@Injectable()
export class UserThemeService implements OnDestroy {
  private subscription: Subscription;
  constructor(private users: UsersFacade, private theme: ThemeService) {
    this.subscription = (this.users.authUser$ as Observable<User>)
      .pipe(filter(user => user !== undefined))
      .subscribe(user => {
        this.setUserSettings(user);
      });
  }

  setUserSettings(user: User) {
    this.theme.setDarkThemeStatus(user.settings.darkMode);
    this.theme.setThemeColors(user.settings.colors);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
