import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoColumnComponent } from './two-column/two-column.component';
import { MasonryComponent } from './masonry/masonry.component';
import { MasonryLayoutDirective } from './masonry/masonry.directive';
import { CenterPageComponent } from './center-page/center-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TwoColumnComponent,
    MasonryComponent,
    MasonryLayoutDirective,
    CenterPageComponent
  ],
  exports: [TwoColumnComponent, MasonryComponent, CenterPageComponent]
})
export class CommonUiLayoutsModule {}
