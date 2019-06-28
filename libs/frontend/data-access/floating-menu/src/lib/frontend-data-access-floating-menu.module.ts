import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@workspace/common/ui/custom-material';
import { CommonUtilsOverlayModule } from '@workspace/frontend/utils/overlay';
import { ToolbarMenuIconComponent } from './components/toolbar-menu-icon/toolbar-menu-icon.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { UiDropDownMenuComponent } from './components/ui/ui-drop-down-menu.component';
import { DataAccessUsersModule } from '@workspace/frontend/data-access/users';

@NgModule({
  declarations: [
    ToolbarMenuIconComponent,
    DropDownMenuComponent,
    UiDropDownMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule,
    CommonUtilsOverlayModule,
    DataAccessUsersModule
  ],
  exports: [ToolbarMenuIconComponent],
  entryComponents: [DropDownMenuComponent]
})
export class DataAccessFloatingMenuModule {}
