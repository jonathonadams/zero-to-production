import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ISideNaveRoute } from '@uqt/types';
import { slideInAnimation } from '@uqt/common/animations';

@Component({
  selector: 'uqt-ui-side-nav',
  templateUrl: './ui-side-nav.component.html',
  styleUrls: ['./ui-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation]
})
export class UiSideNavComponent {
  @Input() opened: boolean | undefined;
  @Input() routes: ISideNaveRoute[] | undefined;
  @Output() setValue = new EventEmitter<boolean>();

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
