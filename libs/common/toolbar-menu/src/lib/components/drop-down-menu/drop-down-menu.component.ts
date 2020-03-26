import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@ztp/data';
import { AuthFacade } from '@ztp/shared/auth/data-access';

@Component({
  selector: 'ztp-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownMenuComponent {
  public user$: Observable<IUser | null>;
  @Output() logout = new EventEmitter();

  constructor(private facade: AuthFacade) {
    this.user$ = this.facade.user$;
  }
}
