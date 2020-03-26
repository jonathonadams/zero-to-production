import {
  trigger,
  transition,
  group,
  animate,
  style,
} from '@angular/animations';

export const expandFromCenter = trigger('centerExpand', [
  transition(':enter', [
    style({ width: 0, opacity: 0, left: '50%', position: 'relative' }),
    group([
      animate(
        '0.3s 0.1s ease',
        style({
          left: 0,
          width: '*',
        })
      ),
      animate(
        '0.3s ease',
        style({
          opacity: 1,
        })
      ),
    ]),
  ]),
]);
