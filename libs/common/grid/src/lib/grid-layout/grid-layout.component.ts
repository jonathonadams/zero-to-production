import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import type { IGrid } from '../grid.interface';
import { GridTileComponent } from '../grid-tile/grid-tile.component';
import { GridLayoutService } from '../grid-layout.service';

@Component({
  selector: 'ztp-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutComponent implements AfterViewInit, OnChanges {
  constructor(private service: GridLayoutService) {}

  @Input() grid: IGrid[] | null;
  @ContentChildren(GridTileComponent, { descendants: true }) tiles: QueryList<
    GridTileComponent
  >;

  ngAfterViewInit() {
    this.setGrid();
  }

  ngOnChanges() {
    this.setGrid();
  }

  setGrid() {
    if (this.grid && this.tiles) {
      const tileArray = this.tiles.toArray();
      let minColumns = 0;
      let minRows = 0;

      this.grid.forEach((grid, i) => {
        if (grid.colEnd > minColumns) minColumns = grid.colEnd;
        if (grid.rowEnd > minRows) minRows = grid.rowEnd;

        // set the position of the tile if it exists
        tileArray[i]?.setPosition(grid);
      });

      this.service.setMinColumns(minColumns);
      this.service.setMinRows(minRows);
    }
  }
}
