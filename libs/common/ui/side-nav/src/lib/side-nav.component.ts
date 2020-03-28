import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTER_ANIMATIONS } from '@ztp/common/animations';

// https://jonsuh.com/hamburgers/

export interface ISideNaveRoute {
  path: string;
  icon: string;
  label: string;
  children?: {
    path: string;
    label: string;
  }[];
}

@Component({
  selector: 'ztp-common-ui-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ROUTER_ANIMATIONS],
})
export class CommonUiSideNavComponent {
  isOpen = false;

  @Input() menuButton = true;
  @Input() routes: ISideNaveRoute[] | null;
  @Input() mode = 'push';

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
