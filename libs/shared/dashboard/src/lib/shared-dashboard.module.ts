import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiCardModule } from '@ztp/common/ui/card';
import { CommonGridModule } from '@ztp/common/grid';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CommonUiCardModule,
    CommonGridModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [DashboardComponent],
})
export class SharedDashboardModule {}
