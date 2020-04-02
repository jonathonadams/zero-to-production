import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayService } from './overlay.service';

@NgModule({
  imports: [OverlayModule, PortalModule],
  exports: [OverlayModule, PortalModule],
  providers: [OverlayService],
})
export class CommonUtilsOverlayModule {}
