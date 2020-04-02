import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ROUTER_ANIMATIONS } from '@ztp/common/animations';
import { HamburgerComponent } from './hamburger.component';

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
  @ViewChild(HamburgerComponent) button: HamburgerComponent;
  @ViewChildren('navLinks') links: QueryList<ElementRef<HTMLElement>>;

  constructor(private cd: ChangeDetectorRef) {}

  @HostListener('window:keyup', ['$event'])
  onWindowKeyup(event: KeyboardEvent) {
    // When the escape key is pressed and the toggle is open
    if (this.isOpen && event.key === 'Escape') {
      // close the window and send focus back to the open button
      this.isOpen = false;
      this.button.focus();
    }
  }

  menuButtonToggled(open: boolean) {
    this.isOpen = open;
    if (open) {
      // on mobile devices, the side menu is completely removed from all presentations, display: none
      // the links query needs to be repopulated before sending focusing on the first element
      this.cd.detectChanges();
      this.links.first.nativeElement.focus();
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
