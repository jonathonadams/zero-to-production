import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { appRouterAnimations } from './app-routing.animations';
import { AnimationService } from '@ztp/common/animations';
import { Observable } from 'rxjs';
import { ThemeService } from '@ztp/common/theme';

@Component({
  selector: 'todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [appRouterAnimations],
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

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
