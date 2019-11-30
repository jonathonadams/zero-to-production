import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUser } from '@ngw/types';
import { UsersFacade } from '@ngw/data-access/users';

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

  toggleDarkMode(darkMode: boolean) {}
}
