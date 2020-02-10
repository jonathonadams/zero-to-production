import { Component, ChangeDetectionStrategy } from '@angular/core';
import { authRouterAnimations } from './auth-router.animations';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@uqt/common/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'uqt-common-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [authRouterAnimations]
})
export class AuthComponent {
  public darkTheme$: Observable<boolean>;

  constructor(private theme: ThemeService) {
    this.darkTheme$ = this.theme.darkTheme$;
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
