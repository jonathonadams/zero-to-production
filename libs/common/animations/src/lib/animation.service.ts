import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnimationService implements OnDestroy {
  private mql: MediaQueryList | undefined | null;
  private mqlListener: ((mql: MediaQueryListEvent) => void) | null;
  private enabled: BehaviorSubject<boolean>;
  enabled$: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // default animations to false
    let animations = false;
    if (isPlatformBrowser(this.platformId) && window.matchMedia) {
      // The 'matches' property will return true if the the user does NOT want animations
      const prefersReduceMotion = window.matchMedia('(prefers-reduced-motion)');
      // If the user want animations, then set to true
      if (!prefersReduceMotion.matches) animations = true;
      this.mql = prefersReduceMotion;

      /* Register for future events */
      this.mqlListener = (mq) => {
        this.onMediaMatchChange(mq.matches);
      };

      if (this.mql.addEventListener as any) {
        this.mql.addEventListener('change', this.mqlListener);
      } else {
        this.mql.addListener(this.mqlListener);
      }
    }

    this.enabled = new BehaviorSubject(animations);
    this.enabled$ = this.enabled.asObservable();
  }

  toggleAnimations(enabled: boolean): void {
    this.enabled.next(enabled);
  }

  private onMediaMatchChange(reducedMotion: boolean) {
    this.enabled.next(!reducedMotion);
  }

  ngOnDestroy() {
    if (this.mql && this.mqlListener) {
      if (this.mql.removeEventListener) {
        this.mql.removeEventListener('change', this.mqlListener);
      } else {
        this.mql.removeListener(this.mqlListener);
      }

      this.mql = this.mqlListener = null;
    }
  }
}
