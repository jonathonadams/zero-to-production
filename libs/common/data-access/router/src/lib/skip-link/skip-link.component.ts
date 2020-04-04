import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SkipLinkService } from '../skip-link.server';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

import 'focus-visible';

@Component({
  selector: 'ztp-router-skip-link',
  templateUrl: './skip-link.component.html',
  styleUrls: ['./skip-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterSkipLinkComponent implements OnDestroy {
  private sub: Subscription;
  trace = '';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private skipLink: SkipLinkService,
    private cd: ChangeDetectorRef
  ) {
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const navigation = router.getCurrentNavigation();
        // Check if it has navigated before, this is to not focus on first load
        const trace = this.skipLink.trace;
        if (navigation?.previousNavigation && trace) {
          this.trace = trace;

          const skpLink = this.document.querySelector(
            '#skip-link'
          ) as HTMLElement;
          if (skipLink) {
            skpLink.focus();
          }
          this.cd.markForCheck();
        }
      });
  }

  revertFocus() {
    this.skipLink.focusOnLink();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
