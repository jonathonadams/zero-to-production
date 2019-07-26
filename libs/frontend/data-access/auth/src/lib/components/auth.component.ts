import { Component, ChangeDetectionStrategy } from '@angular/core';
import { slideInAnimation } from './router.animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ngw-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation]
})
export class AuthComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
