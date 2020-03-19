import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { ANIMATE_CLASS } from '@uqt/common/animations';

@Component({
  selector: 'uqt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input() routerAnimate = false;
  get animate() {
    return this.routerAnimate ? ANIMATE_CLASS : '';
  }
}
