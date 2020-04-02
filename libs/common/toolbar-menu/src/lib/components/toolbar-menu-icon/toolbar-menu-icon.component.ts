import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { OverlayService } from '@ztp/shared/utils/overlay';
import { AuthFacade } from '@ztp/shared/auth/data-access';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ztp-toolbar-menu-icon',
  templateUrl: './toolbar-menu-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarMenuIconComponent {
  @ViewChild('open', { static: true }) open: MatButton;

  constructor(
    private el: ElementRef,
    private overlay: OverlayService,
    private auth: AuthFacade
  ) {}

  public showDropDownMenu() {
    this.auth.loadLoggedInUser();

    const { overlayRef, componentRef } = this.overlay.createOverlay<
      DropDownMenuComponent
    >(this.el, DropDownMenuComponent);

    componentRef.instance.logout.subscribe(() => {
      this.auth.logout();
      overlayRef.dispose();
    });

    // dismiss is only called form pushing the escape key
    // set focus back to the open button
    componentRef.instance.dismiss.subscribe(() => {
      overlayRef.dispose();
      this.open.focus();
    });

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
