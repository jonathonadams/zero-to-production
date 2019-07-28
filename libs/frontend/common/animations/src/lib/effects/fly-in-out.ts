import {
  trigger,
  transition,
  style,
  animate,
  state,
  group
} from '@angular/animations';

export const flyInOutTransition = trigger('flyInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)' }),
    animate(100)
  ]),
  transition(':leave', [animate(100, style({ transform: 'translateX(100%)' }))])
]);

export const flyInOutWithDifferentEasing = trigger('flyInOut', [
  transition(':enter', [
    style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
    group([
      animate(
        '0.3s 0.1s ease',
        style({
          transform: 'translateX(0)',
          width: 120
        })
      ),
      animate(
        '0.3s ease',
        style({
          opacity: 1
        })
      )
    ])
  ]),
  transition(':leave', [
    group([
      animate(
        '0.3s ease',
        style({
          transform: 'translateX(50px)',
          width: 10
        })
      ),
      animate(
        '0.3s 0.2s ease',
        style({
          opacity: 0
        })
      )
    ])
  ])
]);
