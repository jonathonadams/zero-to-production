import {
  animate,
  keyframes,
  style,
  trigger,
  transition,
  query,
  animateChild,
  group,
} from '@angular/animations';

/*
Each time an animation is triggered in Angular, the parent animation
always get priority and child animations are blocked. In order for a
child animation to run, the parent animation must query each of the
elements containing child animations and then allow the animations to
run using the animateChild() function.

Note the animateChild is designed to be used with the query function
*/

export const childAnimation = trigger('childAnimation', [
  transition('SomeState <=> ToAnotherState', [
    // Allow children to animate
    query(':leave', animateChild()),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
    ]),
    query(':enter', animateChild()),
  ]),
]);

/*
The @.disabled allows to disable any animations and child animations

<div [@.disabled]="isDisabled">
  <div [@childAnimation]="isOpen ? 'open' : 'closed'"
     class="open-close-container"
  >
    <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
  </div>
</div>

Animation Callbacks
Animations can trigger events when they start and when the finish.

export class OpenCloseComponent {
   onAnimationEvent ( event: AnimationEvent ) {
     // ... some logic
   }
}

<div [@openClose]="isOpen ? 'open' : 'closed'"
  (@openClose.start)="onAnimationEvent($event)"
  (@openClose.done)="onAnimationEvent($event)">
</div>


Keyframes
A basic animation is the transitions from one state to another.
That is, from the starting keyframe to ending keyframe.

You can animate to any number of keyframes with the keyframe() function.
The keyframes takes an array of styles. The styles takes an optional 'offset'
property, measuring between 0 and 1, as part of styles object. If omitted, the offsets are 
divided equally between the number of frames

*/
const keyframe = trigger('keyframe', [
  transition('* => active', [
    animate(
      '2s',
      keyframes([
        style({ backgroundColor: 'blue' }), // offset 0
        style({ backgroundColor: 'red' }), // offset 0.5
        style({ backgroundColor: 'orange' }), // offset 1
      ])
    ),
  ]),
]);

const keyframeWithOffset = trigger('keyframe', [
  transition('* => active', [
    animate(
      '2s',
      keyframes([
        style({ backgroundColor: 'blue', offset: 0 }),
        style({ backgroundColor: 'red', offset: 0.2 }),
        style({ backgroundColor: 'orange', offset: 1 }),
      ])
    ),
  ]),
]);
