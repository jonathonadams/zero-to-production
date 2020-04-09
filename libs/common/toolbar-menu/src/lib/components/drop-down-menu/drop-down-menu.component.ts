import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@ztp/data';
import { AuthFacade } from '@ztp/common/auth/data-access';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ztp-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownMenuComponent implements AfterViewInit {
  public user$: Observable<IUser | null>;

  @ViewChild('logoutBtn', { static: true }) btn: MatButton;
  @Output() logout = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<void>();

  constructor(private facade: AuthFacade) {
    this.user$ = this.facade.user$;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dismiss.emit();
    }
  }

  ngAfterViewInit() {
    this.btn.focus();
  }
}
