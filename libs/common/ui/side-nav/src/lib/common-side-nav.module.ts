import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CommonUiSideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [CommonUiSideNavComponent],
  imports: [CommonModule, RouterModule, CustomMaterialModule],
  exports: [CommonUiSideNavComponent],
})
export class CommonUiSideNavModule {}
