import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { slideInAnimation } from '@uqt/common/animations';

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
  selector: 'uqt-common-ui-sidenav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation]
})
export class CommonUiSideNavComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() routes: ISideNaveRoute[] | null;

  constructor(private cd: ChangeDetectorRef) {}

  public toggle() {
    this.sidenav.toggle();
    this.cd.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
