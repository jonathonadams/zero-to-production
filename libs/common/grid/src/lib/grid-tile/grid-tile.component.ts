import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { IGrid } from '../grid.interface';

@Component({
  selector: 'ztp-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridTileComponent {
  constructor(private el: ElementRef) {}
  setPosition(grid: IGrid) {
    this.el.nativeElement.style.gridColumnStart = grid.colStart;
    this.el.nativeElement.style.gridColumnEnd = `span ${
      grid.colEnd - grid.colStart + 1
    }`;
    this.el.nativeElement.style.gridRowStart = grid.rowStart;
    this.el.nativeElement.style.gridRowEnd = `span ${
      grid.rowEnd - grid.rowStart + 1
    }`;
  }
}
