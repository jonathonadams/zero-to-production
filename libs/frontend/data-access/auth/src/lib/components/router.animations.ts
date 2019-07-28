import {
  trigger,
  transition,
  query,
  style,
  animateChild,
  group,
  animate,
  sequence
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('LoginPage <=> RegisterPage', [
    // style({
    //   // backfaceVisibility: 'hidden',
    //   opacity: 1
    // }),
    // sequence([
    query(':leave', [
      style({
        // backfaceVisibility: 'hidden',
        opacity: 1
      }),
      animate(
        '1s',
        style({
          opacity: 0
          // transform: 'rotateY(180deg)'
        })
      )
    ]),
    query(':enter', [animate('1s', style({}))])
    // ])
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       width: '100%'
    //     })
    //   ]),
    //   query(':enter', [style({ left: '-100%' })]),
    //   group([
    //     query(':leave', [animate('200ms ease-out', style({ left: '100%' }))]),
    //     query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
    //   ]),
    //   query(':enter', animateChild())
  ])
]);
