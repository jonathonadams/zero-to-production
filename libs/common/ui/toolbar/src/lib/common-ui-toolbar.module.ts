import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiToolbarComponent } from './toolbar.component';

//TODO -> remove material dependency
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CommonUiToolbarComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [CommonUiToolbarComponent]
})
export class CommonUiToolbarModule {}
