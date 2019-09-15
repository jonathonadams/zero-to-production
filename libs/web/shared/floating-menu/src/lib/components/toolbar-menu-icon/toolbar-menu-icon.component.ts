import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { OverlayService } from '@ngw/utils/overlay';
import { Router } from '@angular/router';
import { AuthFacade } from '@ngw/data-access/auth';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';

@Component({
  selector: 'ngw-toolbar-menu-icon',
  templateUrl: './toolbar-menu-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarMenuIconComponent {
  constructor(
    private el: ElementRef,
    private overlay: OverlayService,
    private router: Router,
    private auth: AuthFacade
  ) {}

  public showDropDownMenu() {
    const { overlayRef, componentRef } = this.overlay.createOverlay<
      DropDownMenuComponent
    >(this.el, DropDownMenuComponent);

    componentRef.instance.navigateToProfile.subscribe(() => {
      this.router.navigate(['/profile']);
      overlayRef.dispose();
    });

    componentRef.instance.logout.subscribe(() => {
      this.auth.logout();
      overlayRef.dispose();
    });
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
