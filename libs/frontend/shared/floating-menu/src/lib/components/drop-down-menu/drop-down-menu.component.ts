import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '@ngw/shared/interfaces';
import { UsersFacade } from '@ngw/frontend/data-access/users';

@Component({
  selector: 'ngw-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownMenuComponent {
  public user$: Observable<IUser | undefined>;

  @Output() navigateToProfile = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(private userFacade: UsersFacade) {
    this.user$ = this.userFacade.authUser$.pipe(
      filter(user => user !== undefined)
    );
  }

  toggleDarkMode(darkMode: boolean) {
    // the user is only undefined when not logged in, it is safe to type cast here
    (this.user$ as Observable<IUser>).pipe(take(1)).subscribe(user => {
      const userSettings = { darkMode, colors: user.settings.colors };
      this.userFacade.updateUser({ ...user, settings: userSettings });
    });
  }
}
