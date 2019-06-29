import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class SideNavService {
  private opened = new BehaviorSubject<boolean>(false);
  opened$ = this.opened.asObservable();

  private lastScroll = new BehaviorSubject<boolean>(false);
  lastScrollDown$ = this.lastScroll.asObservable().pipe(debounceTime(500));

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
