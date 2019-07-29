import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';
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
  private lastScrollPosition = 0;
  private lastScrollDown = false;

  public opened$: Observable<boolean>;

  @ViewChild('appContent', { static: true }) private content!: ElementRef<
    HTMLElement
  >;

  constructor(private sideNavService: SideNavService) {
    this.opened$ = sideNavService.opened$;
  }

  setValue(value: boolean) {
    this.sideNavService.openedValue = value;
  }

  scroll() {
    if (this.content.nativeElement.scrollTop > this.lastScrollPosition) {
      if (!this.lastScrollDown) {
        this.lastScrollDown = true;
        this.sideNavService.lastScrollDown = true;
      }
    } else {
      if (this.lastScrollDown) {
        this.lastScrollDown = false;
        this.sideNavService.lastScrollDown = false;
      }
    }
    this.lastScrollPosition = this.content.nativeElement.scrollTop;
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
