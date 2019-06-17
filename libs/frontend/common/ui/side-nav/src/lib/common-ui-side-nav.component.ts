import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ISideNaveLink } from '@workspace/shared/data';
import { CommonUiSideNavService } from './common-ui-side-nav.service';

@Component({
  selector: 'todo-common-side-nav',
  templateUrl: './common-ui-side-nav.component.html',
  styleUrls: ['./common-ui-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiSideNavComponent {
  @Input() navLinks: ISideNaveLink[] | undefined;

  public opened$: Observable<boolean>;

  constructor(private sideNavService: CommonUiSideNavService) {
    this.opened$ = sideNavService.opened$;
  }

  setValue(value: boolean) {
    this.sideNavService.setValue(value);
  }
}
