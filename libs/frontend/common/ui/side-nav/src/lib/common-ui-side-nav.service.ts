import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommonUiSideNavService {
  private opened = new BehaviorSubject<boolean>(false);
  opened$ = this.opened.asObservable();

  toggle() {
    this.opened.next(!this.opened.value);
  }

  setValue(value: boolean) {
    this.opened.next(value);
  }

  open() {
    this.opened.next(true);
  }

  close() {
    this.opened.next(false);
  }
}
