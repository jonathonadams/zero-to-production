import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '@ztp/common/utils/theme';
import { Observable } from 'rxjs';
import { AnimationService } from '@ztp/common/animations';

@Component({
  selector: 'examples-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  darkMode$: Observable<boolean>;
  animationsEnabled$: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private animationService: AnimationService
  ) {
    this.darkMode$ = this.themeService.darkMode$;
    this.animationsEnabled$ = this.animationService.enabled$;
  }
}
