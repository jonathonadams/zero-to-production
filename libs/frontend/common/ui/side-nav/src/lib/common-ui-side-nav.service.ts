import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonUiSideNavService {
  private opened = new BehaviorSubject<boolean>(false);
  opened$ = this.opened.asObservable();

  private lastScroll = new BehaviorSubject<boolean>(false);
  lastScrollDown$ = this.lastScroll.asObservable();

  set openedValue(value: boolean) {
    this.opened.next(value);
  }

  toggle() {
    this.opened.next(!this.opened.value);
  }

  open() {
    this.opened.next(true);
  }

  close() {
    this.opened.next(false);
  }

  set lastScrollDown(value: boolean) {
    this.lastScroll.next(value);
  }
}
