import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonRouterModule } from '@ztp/common/router';
import { CommonUiSideNavComponent } from './side-nav.component';
import { HamburgerComponent } from './hamburger.component';
import { MatIconModule } from '@angular/material/icon';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [CommonUiSideNavComponent, HamburgerComponent],
  imports: [
    CommonModule,
    RouterModule,
    CommonRouterModule,
    MatIconModule,
    A11yModule,
  ],
  exports: [CommonUiSideNavComponent],
})
export class CommonUiSideNavModule {}
