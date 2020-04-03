import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { GridTileComponent } from './grid-tile/grid-tile.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GridLayoutComponent, GridTileComponent],
  exports: [GridLayoutComponent, GridTileComponent],
})
export class CommonGridModule {}
