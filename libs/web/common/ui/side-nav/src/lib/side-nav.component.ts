import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SideNavFacade } from './+state/side-nav.facade';
import { ISideNaveRoute } from './navigation.interface';

@Component({
  selector: 'uqt-common-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiSideNavComponent {
  opened$: Observable<boolean>;
  route$: Observable<ISideNaveRoute[]>;

  constructor(private facade: SideNavFacade) {
    this.opened$ = this.facade.opened$;
    this.route$ = this.facade.route$;
  }

  setValue(opened: boolean): void {
    this.facade.setValue(opened);
  }
}
