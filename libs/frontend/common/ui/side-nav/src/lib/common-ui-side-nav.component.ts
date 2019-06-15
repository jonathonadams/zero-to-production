import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'todo-common-side-nav',
  templateUrl: './common-ui-side-nav.component.html',
  styleUrls: ['./common-ui-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonUiSideNavComponent {
  @Input() navLinks:
    | { path: string; icon: string; label: string }[]
    | undefined;
}
