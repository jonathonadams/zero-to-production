import {
  animation,
  style,
  query,
  animateChild,
  animate
} from '@angular/animations';

/**
 * The card flip happens in two stages. The leaving card flips half way and
 * then the entering card flips the other 90 degrees. This means the total timing
 * of the card flip is 2x the timing listed below. Additionally the card leaving uses the
 * ease-in easing as the card entering use ease-out. This is because you want the
 * perception that at the midway point is at its fastest.
 */

export const routerCardFlipAnimation = animation([
  // With routing changes, the new route component is inserted as the first child
  // and the leaving component is the second child element

  style({ position: 'relative' }),

  query(':leave', [style({ position: 'relative' })]),
  query(':enter', [
    style({ position: 'absolute', transform: 'translate(1000%)' })
  ]),

  // Allow the children of the leaving element to animate
  query(':leave', animateChild()),

  query(':leave', [
    style({ transform: 'none' }),
    animate('{{ timing }} ease-in', style({ transform: '{{ exitFlip }}' })),
    // Once it has flipped, set to absolute positioning and move off screen
    style({ position: 'absolute', transform: 'translate(1000%)' })
  ]),

  // Change the height of the parent component and set to absolute to stop any overflow
  // style({ position: 'absolute', height: '*' }),

  // move the card entered, back to the center, relative positioning for flex-box height
  // and start it 90 degrees flipped
  query(':enter', [
    style({
      position: 'relative',
      transform: '{{ enterFlip }}'
    }),

    // animate to normal positions
    animate('{{ timing }} ease-out', style({ transform: 'none' }))
  ]),

  // query(':enter', style([{ position: '*', left: '*' }])),
  // Allow children to animate
  query(':enter', animateChild())
]);
