import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedUtilsOverlayModule } from '@ztp/shared/utils/overlay';
import { SharedUsersDataAccessModule } from '@ztp/shared/users/data-access';
import { ToolbarMenuIconComponent } from './components/toolbar-menu-icon/toolbar-menu-icon.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { UiDropDownMenuComponent } from './components/ui/ui-drop-down-menu.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; // TODO -> remove mat list
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ToolbarMenuIconComponent,
    DropDownMenuComponent,
    UiDropDownMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    SharedUtilsOverlayModule,
    SharedUsersDataAccessModule,
  ],
  exports: [ToolbarMenuIconComponent],
})
export class CommonToolbarMenuModule {}
