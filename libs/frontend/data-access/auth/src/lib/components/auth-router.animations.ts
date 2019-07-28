import {
  trigger,
  transition,
  query,
  style,
  animateChild,
  animate,
  sequence
} from '@angular/animations';

/**
 * The card flip happens in two stages. The leaving card flips half way and
 * then the entering card flips the other 90 degrees. This means the total timing
 * of the card flip is 2x the timing listed below. Additionally the card leaving uses the
 * ease-in easing as the card entering use ease-out. This is because you want the
 * perception that at the midway point is at its fastest.
 */
const ANIMATION_TIMING = '0.2s';
export const authRouterAnimations = trigger('authRouterAnimations', [
  transition('LoginPage <=> RegisterPage', [
    // First set, the parent to be relative positioning
    // and set the transform style to 3d
    style({
      position: 'relative',
      transformStyle: 'preserve-3d'
    }),
    query(':enter, :leave', [
      // Hide the background, although you never see it and set absolute positioning
      style({
        backfaceVisibility: 'hidden',
        position: 'absolute'
      })
    ]),
    // Move the newly entered element off screen
    query(':enter', [style({ left: '1000%' })]),
    // because fo flexbox styling, to maintain the hight set the leaving to relative
    query(':leave', [style({ position: 'relative' })]),

    // Allow the children of the leaving element to animate
    query(':leave', animateChild()),

    // complete all animations in order
    sequence([
      // for the leaving card, we want flip 90 deg from its starting position
      query(':leave', [
        style({ transform: 'none' }),
        animate(
          `${ANIMATION_TIMING} ease-in`,
          style({ transform: 'rotateY(-90deg)' })
        )
      ]),
      // Once it has flipped, set to absolute positioning and move off screen
      query(':leave', [style({ left: '1000%', position: 'absolute' })]),
      // move the card entered, back to the center, relative positioning for flexbox height
      // and start it 90 degrees flipped
      query(':enter', [
        style({
          position: 'relative',
          left: 0,
          transform: 'rotateY(+90deg)'
        }),
        // animate to normal positions
        animate(`${ANIMATION_TIMING} ease-out`, style({ transform: 'none' }))
      ])
    ]),
    // Allow children to animate
    query(':enter', animateChild())
  ])
]);
