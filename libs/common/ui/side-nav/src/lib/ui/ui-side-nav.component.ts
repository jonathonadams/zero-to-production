import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@uqt/common/animations';
import { ISideNaveRoute } from '../navigation.interface';

@Component({
  selector: 'uqt-ui-side-nav',
  templateUrl: './ui-side-nav.component.html',
  styleUrls: ['./ui-side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation]
})
export class UiSideNavComponent {
  @Input() opened: boolean | null;
  @Input() routes: ISideNaveRoute[] | null;
  @Output() setValue = new EventEmitter<boolean>();

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
