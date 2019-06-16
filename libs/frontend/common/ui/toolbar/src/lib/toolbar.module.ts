import { NgModule } from '@angular/core';
import { CommonUiToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CommonUiToolbarComponent],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  exports: [CommonUiToolbarComponent]
})
export class CommonUiToolbarModule {}
