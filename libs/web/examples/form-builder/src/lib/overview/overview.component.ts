import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IExample } from '@uqt/types';

@Component({
  selector: 'ex-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent {
  example: IExample | undefined;
}
