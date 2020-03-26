import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@ztp/common/ui/custom-material';
import { CommonUiCardModule } from '@ztp/common/ui/card';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CustomMaterialModule,
    CommonUiCardModule,
  ],
  exports: [DashboardComponent],
})
export class SharedDashboardModule {}
