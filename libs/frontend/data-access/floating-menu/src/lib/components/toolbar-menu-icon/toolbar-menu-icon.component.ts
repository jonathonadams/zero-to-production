import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { OverlayService } from '@workspace/frontend/common/utils/overlay';
import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component';

@Component({
  selector: 'todo-toolbar-menu-icon',
  templateUrl: './toolbar-menu-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarMenuIconComponent {
  constructor(private el: ElementRef, private overlay: OverlayService) {}

  public showDropDownMenu() {
    const { overlayRef, componentRef } = this.overlay.createOverlay<
      DropDownMenuComponent
    >(this.el, DropDownMenuComponent);

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
