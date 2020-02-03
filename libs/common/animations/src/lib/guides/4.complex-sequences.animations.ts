import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
  group
} from '@angular/animations';

/*
query()    :finds one or more inner HTML elements and applies animations to each element individually.
stagger()  :allows you to define a timing gap between each queried item that is animated and thus animates elements with a delay between them.
*/

export const stackUpDown = trigger('stackUpDown', [
  transition(':enter', [
    query('input', [
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
    query('input', [
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

/*
group()    :runs multiple animation steps in parallel. Useful to animate different properties at the same time with different easing.
sequence() :runs animation steps one after another.
*/

export const expandFromLeft = trigger('expandFromLevt', [
  transition(':enter', [
    style({ width: 0, opacity: 0 }),
    group([
      animate(
        '0.3s 0.1s ease',
        style({
          width: '*'
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
    style({ width: '*', opacity: 1 }),
    group([
      animate(
        '0.3s ease',
        style({
          transform: 'translateX(50px)',
          width: 0
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
