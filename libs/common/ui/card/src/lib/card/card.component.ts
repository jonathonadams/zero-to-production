import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ANIMATE_CLASS } from '@ztp/common/animations';

@Component({
  selector: 'ztp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() routerAnimate = false;
  get animate() {
    return this.routerAnimate ? ANIMATE_CLASS : '';
  }
}
