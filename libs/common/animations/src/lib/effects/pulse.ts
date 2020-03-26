import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  animation,
} from '@angular/animations';

export const somePulse = trigger('puleEffect', [
  state(
    'open',
    style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow',
    })
  ),
  state(
    'close',
    style({
      height: '100px',
      opacity: 0.5,
      backgroundColor: 'green',
    })
  ),
  transition('* => *', [
    animate(
      '1s',
      keyframes([
        style({ opacity: 0.1, offset: 0.1 }),
        style({ opacity: 0.6, offset: 0.2 }),
        style({ opacity: 1, offset: 0.5 }),
        style({ opacity: 0.2, offset: 0.7 }),
      ])
    ),
  ]),
]);

export const pulseAnimation = animation([
  style({ transform: 'scale(1)' }),
  animate(
    '{{ timings }}',
    keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale({{ scale }})', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 }),
    ])
  ),
]);
