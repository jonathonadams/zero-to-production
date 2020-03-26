import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GUIDES } from '../guides';

@Component({
  selector: 'ztp-examples-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuidesComponent {
  guides = GUIDES;
}
