import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'layout-two-column',
  templateUrl: './two-column.component.html',
  styleUrls: ['./two-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoColumnComponent {}
