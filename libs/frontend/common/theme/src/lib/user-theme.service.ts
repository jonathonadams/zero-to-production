import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IUser } from '@ngw/shared/interfaces';
import { UsersFacade } from '@ngw/frontend/data-access/users';
import { ThemeService } from './theme.service';

@Injectable({ providedIn: 'root' })
export class UserThemeService implements OnDestroy {
  private subscription: Subscription;
  constructor(private users: UsersFacade, private theme: ThemeService) {
    this.subscription = (this.users.authUser$ as Observable<IUser>)
      .pipe(filter(user => user !== undefined))
      .subscribe(user => {
        this.setUserSettings(user);
      });
  }

  setUserSettings(user: IUser) {
    this.theme.setDarkThemeStatus(user.settings.darkMode);
    this.theme.setThemeColors(user.settings.colors);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
