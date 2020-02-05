import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  enabled = new BehaviorSubject(true);
  enabled$ = this.enabled.asObservable();

  toggleAnimations(enabled: boolean): void {
    this.enabled.next(enabled);
  }
}
