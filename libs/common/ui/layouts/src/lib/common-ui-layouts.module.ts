import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoColumnComponent } from './two-column/two-column.component';
import { MasonryComponent } from './masonry/masonry.component';
import { MasonryLayoutDirective } from './masonry/masonry.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TwoColumnComponent, MasonryComponent, MasonryLayoutDirective],
  exports: [TwoColumnComponent, MasonryComponent]
})
export class CommonUiLayoutsModule {}
