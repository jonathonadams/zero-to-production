import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@ztp/common/ui/custom-material';
import { CommonUiSideNavComponent } from './side-nav.component';
import { HamburgerComponent } from './hamburger.component';

@NgModule({
  declarations: [CommonUiSideNavComponent, HamburgerComponent],
  imports: [CommonModule, RouterModule, CustomMaterialModule],
  exports: [CommonUiSideNavComponent],
})
export class CommonUiSideNavModule {}
