import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MediaQueryService } from '@ztp/common/utils/media-query';

@Injectable({ providedIn: 'root' })
export class AnimationService extends MediaQueryService implements OnDestroy {
  private enabled = new BehaviorSubject(false);
  enabled$ = this.enabled.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    super();

    if (isPlatformBrowser(this.platformId)) {
      const animations = this.listenToMediaQuery(
        '(prefers-reduced-motion)',
        this.prefersReducedMotion.bind(this)
      );

      if (animations !== undefined) this.enabled.next(!animations);
    }
  }

  prefersReducedMotion(matches: boolean) {
    this.enabled.next(!matches);
  }

  toggleAnimations(enabled: boolean): void {
    this.enabled.next(enabled);
  }

  ngOnDestroy() {
    this.removeMediaListener();
  }
}
