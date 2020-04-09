import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { IGrid } from '@ztp/common/grid';

@Component({
  selector: 'ztp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  constructor(private breakpointObserver: BreakpointObserver) {}

  cards = [
    { title: 'Card 1' },
    { title: 'Card 2' },
    { title: 'Card 3' },
    { title: 'Card 4' },
  ];

  grid$: Observable<IGrid[]> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { colStart: 1, colEnd: 1, rowStart: 1, rowEnd: 1 },
            { colStart: 2, colEnd: 2, rowStart: 1, rowEnd: 1 },
            { colStart: 1, colEnd: 1, rowStart: 2, rowEnd: 2 },
            { colStart: 2, colEnd: 2, rowStart: 2, rowEnd: 2 },
          ];
        }

        return [
          { colStart: 1, colEnd: 2, rowStart: 1, rowEnd: 1 },
          { colStart: 1, colEnd: 1, rowStart: 2, rowEnd: 2 },
          { colStart: 2, colEnd: 2, rowStart: 2, rowEnd: 3 },
          { colStart: 1, colEnd: 1, rowStart: 3, rowEnd: 3 },
        ];
      })
    );
}
