import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonUtilsOverlayModule } from '@ztp/common/utils/overlay';
import { SharedUsersDataAccessModule } from '@ztp/shared/users/data-access';
import { ToolbarMenuIconComponent } from './components/toolbar-menu-icon/toolbar-menu-icon.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ToolbarMenuIconComponent, DropDownMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    CommonUtilsOverlayModule,
    SharedUsersDataAccessModule,
  ],
  exports: [ToolbarMenuIconComponent],
})
export class CommonToolbarMenuModule {}
