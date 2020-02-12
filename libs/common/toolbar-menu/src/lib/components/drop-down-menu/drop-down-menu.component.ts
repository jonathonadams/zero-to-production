import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@uqt/data';
import { AuthFacade } from '@uqt/shared/data-access/auth';

@Component({
  selector: 'uqt-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropDownMenuComponent {
  public user$: Observable<IUser | null>;
  @Output() logout = new EventEmitter();

  constructor(private facade: AuthFacade) {
    this.user$ = this.facade.user$;
  }
}
