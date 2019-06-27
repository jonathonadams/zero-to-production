import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ToolbarService {
  private visibleSubject = new BehaviorSubject<boolean>(true);
  visible$ = this.visibleSubject.asObservable();

  set show(value: boolean) {
    this.visibleSubject.next(value);
  }
}
