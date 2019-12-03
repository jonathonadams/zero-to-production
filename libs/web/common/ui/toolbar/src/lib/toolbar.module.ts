import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '@uqt/common/ui/custom-material';
import { CommonUiToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [CommonUiToolbarComponent],
  imports: [CommonModule, CustomMaterialModule],
  exports: [CommonUiToolbarComponent]
})
export class CommonUiToolbarModule {}
