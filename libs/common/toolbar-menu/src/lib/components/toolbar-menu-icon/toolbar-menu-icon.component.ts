import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { OverlayService } from '@uqt/utils/overlay';
import { AuthFacade } from '@uqt/shared/data-access/auth';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';

@Component({
  selector: 'uqt-toolbar-menu-icon',
  templateUrl: './toolbar-menu-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarMenuIconComponent {
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

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
