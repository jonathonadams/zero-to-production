import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonUiSideNavComponent } from './common-ui-side-nav.component';
import { CommonUiSideNavService } from './common-ui-side-nav.service';

@NgModule({
  declarations: [CommonUiSideNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [CommonUiSideNavService],
  exports: [CommonUiSideNavComponent]
})
export class CommonUiSideNavModule {}
