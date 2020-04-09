import { NgModule } from '@angular/core';
import { ZtpAnchorComponent } from './ztp-anchor/ztp-anchor.component';
import { RaisedButtonComponent } from './raised-button/raised-button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  declarations: [
    ZtpAnchorComponent,
    RaisedButtonComponent,
    IconButtonComponent,
  ],
  exports: [ZtpAnchorComponent, RaisedButtonComponent, IconButtonComponent],
})
export class CommonUiButtonsModule {}
