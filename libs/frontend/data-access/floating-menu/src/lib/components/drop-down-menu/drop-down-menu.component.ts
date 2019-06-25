import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@workspace/shared/data';
import { AuthFacade } from '@workspace/frontend/core/auth';
import { AuthUserFacade } from '@workspace/frontend/data-access/user-auth';
import { UsersFacade } from '@workspace/frontend/data-access/users';

@Component({
  selector: 'todo-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownMenuComponent {
  public user$: Observable<User | undefined>;

  constructor(
    private userFacade: UsersFacade,
    private facade: AuthUserFacade,
    private router: Router,
    private authFacade: AuthFacade
  ) {
    this.user$ = this.facade.authUser$.pipe(filter(user => user !== undefined));
  }

  toggleDarkMode(darkMode: boolean) {
    // the user is only undefined when not logged in, it is safe to type cast here
    (this.user$ as Observable<User>).pipe(take(1)).subscribe(user => {
      const userSettings = { darkMode, colors: user.settings.colors };
      this.userFacade.updateUser({ ...user, settings: userSettings });
    });
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authFacade.logout();
  }
}
