import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import type { IGrid } from '../grid.interface';
import { GridTileComponent } from '../grid-tile/grid-tile.component';
import { GridLayoutService } from '../grid-layout.service';

@Component({
  selector: 'ztp-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
  providers: [GridLayoutService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutComponent implements AfterViewInit {
  constructor(private service: GridLayoutService) {}

  #_grid: IGrid[] | null;
  @Input()
  set grid(grid: IGrid[] | null) {
    this.#_grid = grid;
    this.setGrid();
  }

  @ViewChild('container', { static: true }) private container: ElementRef<
    HTMLDivElement
  >;
  @ContentChildren(GridTileComponent, { descendants: true }) tiles: QueryList<
    GridTileComponent
  >;

  ngAfterViewInit() {
    this.service.setElementRef(this.container);
    this.setGrid();
  }

  setGrid() {
    if (this.#_grid && this.tiles) {
      const tileArray = this.tiles.toArray();
      let minColumns = 0;
      let minRows = 0;
      this.#_grid.forEach((grid, i) => {
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
