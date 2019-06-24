import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@workspace/common/ui/custom-material';
import { CommonUtilsOverlayModule } from '@workspace/frontend/common/utils/overlay';
import { DataAccessUserAuthModule } from '@workspace/frontend/data-access/user-auth';
import { ToolbarMenuIconComponent } from './components/toolbar-menu-icon/toolbar-menu-icon.component';
import { DropDownMenuComponent } from './components/drop-down-menu/drop-down-menu.component';
import { UiDropDownMenuComponent } from './components/ui/ui-drop-down-menu.component';

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
    DataAccessUserAuthModule,
    DataAccessUserAuthModule
  ],
  exports: [ToolbarMenuIconComponent],
  entryComponents: [DropDownMenuComponent]
})
export class DataAccessFloatingMenuModule {}
