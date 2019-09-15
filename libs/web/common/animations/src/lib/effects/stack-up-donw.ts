import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate
} from '@angular/animations';

export const stackUpDown = trigger('stackUpDown', [
  transition(':enter', [
    query('<some-css-query-to-select-inner-html-elements>', [
      style({ opacity: 0, transform: 'translateY(100%)' }),
      stagger('.15s', [
        animate(
          '.15s',
          style({
            opacity: 1,
            transform: 'none'
          })
        )
      ])
    ])
  ]),
  transition(':leave', [
    query('<some-css-query-to-select-inner-html-elements>', [
      style({ opacity: 1, transform: 'none' }),
      stagger('.15s', [
        animate(
          '.15s',
          style({
            opacity: 1,
            transform: 'translateY(-100%)'
          })
        )
      ])
    ])
  ])
]);
