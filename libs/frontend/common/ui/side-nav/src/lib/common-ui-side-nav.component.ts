import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ISideNaveLink } from '@ngw/shared/interfaces';
import { SideNavService } from './common-ui-side-nav.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@ngw/frontend/common/animations';

// TODO -> Redux store and dumb component for view
@Component({
  selector: 'ngw-common-side-nav',
  templateUrl: './common-ui-side-nav.component.html',
  styleUrls: ['./common-ui-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation]
})
export class CommonUiSideNavComponent {
  @Input() navLinks: ISideNaveLink[] | undefined;

  public opened$: Observable<boolean>;

  constructor(private sideNavService: SideNavService) {
    this.opened$ = sideNavService.opened$;
  }

  setValue(value: boolean) {
    this.sideNavService.openedValue = value;
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
