import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiToolbarComponent } from './toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarService } from './toolbar.service';

@NgModule({
  declarations: [CommonUiToolbarComponent],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  providers: [ToolbarService],
  exports: [CommonUiToolbarComponent]
})
export class CommonUiToolbarModule {}
