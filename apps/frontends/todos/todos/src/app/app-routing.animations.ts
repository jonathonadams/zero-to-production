import {
  transition,
  query,
  style,
  animate,
  trigger,
  sequence
} from '@angular/animations';

export const appRouterAnimations = trigger('appRouterAnimations', [
  transition('AuthPages => AppPages', [
    style({ position: 'relative' }),
    query(':enter', [style({ position: 'absolute' })]),

    // Move the newly entered element off screen
    query(':enter', [style({ left: '100%' })]),
    query(':leave', [style({ position: 'relative' })]),

    // complete all animations in order
    sequence([
      // need to query the nested element
      query(':leave ngw-login', [
        style({ opacity: 1 }),
        animate(`200ms ease-in`, style({ opacity: 0 }))
      ]),
      query(':leave', [style({ left: '100%', position: 'absolute' })]),
      query(':enter', [
        style({
          position: 'relative',
          left: 0,
          opacity: 0
        }),
        animate(`200ms ease-out`, style({ opacity: 1 }))
      ])
    ])
  ])
]);
