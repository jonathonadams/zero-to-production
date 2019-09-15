import {
  animation,
  style,
  query,
  animateChild,
  animate,
  keyframes
} from '@angular/animations';

/**
 * The card flip happens in two stages. The leaving card flips half way and
 * then the entering card flips the other 90 degrees. This means the total timing
 * of the card flip is 2x the timing listed below. Additionally the card leaving uses the
 * ease-in easing as the card entering use ease-out. This is because you want the
 * perception that at the midway point is at its fastest.
 */
export function routerCardFlipAnimation({
  flipLeft = false,
  timingEnter = '0.2s',
  timingExit = '0.2s'
} = {}) {
  let enterFlip = 'rotateY(90deg)',
    exitFlip = 'rotateY(-90deg)';

  if (flipLeft) {
    enterFlip = 'rotateY(-90deg)';
    exitFlip = 'rotateY(90deg)';
  }

  return animation(
    [
      // With routing changes, the new route component is inserted as the first child
      // and the leaving component is the second child element

      // First set, the parent to be relative positioning
      style({ position: 'relative' }),

      // because fo flex-box styling, to maintain the hight set the leaving to relative until it has animated away
      query(':leave', [style({ position: 'relative' })]),
      query(':enter', [
        style({ position: 'absolute', left: '10000%', height: '0px' })
      ]),

      // Allow the children of the leaving element to animate
      query(':leave', animateChild()),
      query(':leave', [
        style({ transform: 'none' }),
        animate(
          '{{ timingExit }} ease-in',
          style({ transform: '{{ exitFlip }}' })
        ),
        // Once it has flipped, set to absolute positioning and move off screen
        style({ position: 'absolute', left: '10000%' })
      ]),

      // Change the height of the parent component and set to absolute to stop any overflow
      style({ position: 'relative', height: '*' }),

      // move the card entered, back to the center, relative positioning for flex-box height
      // and start it 90 degrees flipped
      query(':enter', [
        style({
          left: 0,
          position: 'relative',
          transform: '{{ enterFlip }}'
        }),

        // animate to normal positions
        animate('{{ timingEnter }} ease-out', style({ transform: 'none' }))
      ]),
      // Allow children to animate
      query(':enter', animateChild())
    ],
    {
      params: {
        timingEnter,
        timingExit,
        enterFlip,
        exitFlip
      }
    }
  );
}
