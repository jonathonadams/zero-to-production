import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiToolbarComponent } from './toolbar.component';

//TODO -> remove material dependency
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CommonUiToolbarComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CommonUiToolbarComponent]
})
export class CommonUiToolbarModule {}
