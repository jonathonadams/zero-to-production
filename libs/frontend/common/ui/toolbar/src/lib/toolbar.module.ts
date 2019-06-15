import { NgModule } from '@angular/core';
import { CommonUiToolbarComponent } from './toolbar.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [CommonUiToolbarComponent],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [CommonUiToolbarComponent]
})
export class CommonUiToolbarModule {}
