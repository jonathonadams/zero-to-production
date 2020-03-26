import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { SharedUtilsOverlayModule } from '@uqt/utils/overlay';
import { SharedUsersDataAccessModule } from '@uqt/shared/users/data-access';
import { ToolbarMenuIconComponent } from './components/toolbar-menu-icon/toolbar-menu-icon.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { UiDropDownMenuComponent } from './components/ui/ui-drop-down-menu.component';

@NgModule({
  declarations: [
    ToolbarMenuIconComponent,
    DropDownMenuComponent,
    UiDropDownMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    SharedUtilsOverlayModule,
    SharedUsersDataAccessModule,
  ],
  exports: [ToolbarMenuIconComponent],
})
export class CommonToolbarMenuModule {}
