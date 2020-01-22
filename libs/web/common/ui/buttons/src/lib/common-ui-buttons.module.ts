import { NgModule } from '@angular/core';
import { IconButtonDirective } from './icon-button.directive';
import { RaisedButtonDirective } from './raised-button.directive';

@NgModule({
  declarations: [IconButtonDirective, RaisedButtonDirective],
  exports: [IconButtonDirective, RaisedButtonDirective]
})
export class CommonUiButtonsModule {}
