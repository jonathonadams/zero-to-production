import {
  transition,
  query,
  style,
  animate,
  trigger,
  sequence,
  keyframes
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
        style({ opacity: 1, transform: 'none' }),
        animate(
          `200ms ease-in`,
          keyframes([
            style({
              opacity: 0.75,
              transform: 'translate3d(0, 20%, -10em) scale3d(1, 1, 1)'
            }),
            style({
              opacity: 0.5,
              transform: 'translate3d(0, 60%, -16em) scale3d(0.8, 0.8, 0.8)'
            }),
            style({
              opacity: 0.25,
              transform: 'translate3d(0, 120%, -18em) scale3d(0.5, 0.5, 0.5)'
            }),
            style({
              opacity: 0,
              transform: 'translate3d(0, 200%, -20em) scale3d(0.2, 0.2, 0.2)'
            })
          ])
        )
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
