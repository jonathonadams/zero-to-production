import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

/*
 * State animations are the basic animations between two
 * predefined states. You define the styles at given states,
 * then the transition effects between the states.
 *
 * HTML use
 * <div [@triggerName]="expression">...</div>;
 *
 * <div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
 */
export const openCloseAnimation = trigger('openClose', [
  // Define the styles for each state
  // the 'open' sate
  state(
    'open',
    style({
      backGround: 'red',
      opacity: 1,
    })
  ),
  // the 'closed' state
  state(
    'closed',
    style({
      backGround: 'green',
      opacity: 0,
    })
  ),

  // define the transition between the states.
  transition('open => closed' /*state 1 => state 2 */, [
    // define the animation for the transition
    animate('200ms 100ms ease-in-out' /*timing, delay(o), easing(o) */),
  ]),
  transition('closed => open', [animate('1s')]),
]);
