import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTER_ANIMATIONS } from '@ztp/common/animations';

// https://jonsuh.com/hamburgers/

export interface ISideNaveRoute {
  path: string;
  icon: string;
  label: string;
  aria: string;
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
  @ViewChildren('navLinks') links: QueryList<ElementRef<HTMLElement>>;

  constructor(private cd: ChangeDetectorRef) {}

  @HostListener('window:keyup', ['$event'])
  onWindowKeyup(event: KeyboardEvent) {
    // When the escape key is pressed and the toggle is open
    if (this.isOpen) {
      if (event.key === 'Escape') {
        // close the window and send focus back to the open button
        this.isOpen = false;
        return;
      }
    }
  }

  menuButtonToggled() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      // on mobile devices, the side menu is completely removed from all presentations with 'display: none'
      // the links query needs to be repopulated before sending focus on the first element
      this.cd.markForCheck();
      this.links.first.nativeElement.focus();
    }
  }

  trackBy(i: number) {
    return i;
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
