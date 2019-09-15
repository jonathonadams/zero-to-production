import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger
} from '@angular/animations';

/*
 * Transition animations are matched in the order that they
 * are defined.
 */
export const transitionAnimations = trigger('transition', [
  // Note the cascading matching of states
  transition('open => closed', [animate('1s')]),
  transition('closed => open', [animate('0.5s')]),
  // Matches any state -> closed, note that this will not
  // trigger when the open -> closed stat runs because it cascades
  transition('* => closed', [animate('2s')]),
  // bi-directional transition. Note this will never match
  transition('open <=> closed', [animate('0.5s')]),
  // Fall back transition
  transition('* => *', [animate('1s')]),

  // The void state defines an element entering or leaving the page
  // NOTE: The wildcard state * matches to any state, including void.
  transition('void => *', []),

  transition(':enter', []), // alias for void => *
  transition(':leave', []) // alias for * => void
]);

/*
 * Unlike when defining state transition previously, when using
 * wildcard transitions the style of the state are not predefined.
 * In this case, the sate can be defined inside of the transition function
 * and the final styles are defined in the animate function
 *
 * HTML use
 * <div @flyInOut *ngIf=".....">
 *  ...
 * </div>
 */
export const flyInOutAnimation = trigger('flyInOut', [
  transition(':enter', [
    // Define the starting style -> 100% to lef
    style({
      transform: 'translateX(-100%)'
    }),
    //When styles/keyframes is null, it uses the styles from the destination state.
    animate(100)
  ]),
  transition(':leave', [animate(100, style({ transform: 'none' }))])
]);

/*
 * If the value of a style in not currently known the * can be used to represent
 * its current value
 */
export const notStaggeredAccordion = trigger('badAccordion', [
  transition(':enter', [
    // Animate from 0 height -> style defined height
    style({ opacity: 0, height: 0 }),
    animate('1s ease-in', style({ opacity: 1, height: '*' }))
  ]),
  transition(':leave', [
    // Animate from current height -> 0
    style({ opacity: 1, height: '*' }),
    animate('1s ease-out', style({ opacity: 0, height: 0 }))
  ])
]);

/**
 * You can use the ':increment' and ':decrement' to cause animations to trigger
 * when a numerical value goes up or down
 *
 * The below causes a box-shadow "glow" effect.
 *
 * Usage
 * <td [@cellHighlightAnimation]="value">{{ value }}</td>
 */
export const cellHighligh = trigger('cellHighlightAnimation', [
  transition(':increment', [
    style({
      boxShadow: '0 0 2em #009882'
    }),
    animate('2s ease', style({ boxShadow: '0 0 2em rgba(0,0,0,0)' }))
  ]),
  transition(':decrement', [
    style({
      boxShadow: '0 0 2em #ff4181'
    }),
    animate('2s ease', style({ boxShadow: '0 0 2em rgba(0,0,0,0)' }))
  ])
]);
