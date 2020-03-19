import {
  animate,
  query,
  stagger,
  style,
  transition,
  sequence,
  AnimationMetadata
} from '@angular/animations';
import { ANIMATE_CLASS } from './symbols';

export const WATERFALL_ANIMATION: AnimationMetadata[] = [
  // this will skip on load
  // transition(':enter, initial => *', []),
  // this occurs between each route change
  transition('* => *', [
    // route-level animations require that both the new and old pages are
    // aligned at the top of the container using absolute positioning. The
    // top container (the one with [@routerAnimations]) needs to relative...
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      style({ position: 'absolute', top: 0, left: 0, right: 0 })
    ),
    // hide all the cards since each route makes use of that
    query(
      `:enter .${ANIMATE_CLASS}`,
      [style({ opacity: 0, transform: 'translateY(100%)' })],
      { optional: true }
    ),
    // animate away an in each of the cards on the pages
    sequence([
      query(
        `:leave .${ANIMATE_CLASS}`,
        stagger('100ms', [
          animate(
            '300ms cubic-bezier(.35,0,.25,1)',
            style({ transform: 'translateY(+200%)', opacity: 0 })
          )
        ]),
        { optional: true }
      ),
      query(
        `:enter .${ANIMATE_CLASS}`,
        stagger('100ms', [
          animate(
            '300ms cubic-bezier(.35,0,.25,1)',
            style({ opacity: 1, transform: 'translateY(0%)' })
          )
        ]),
        { optional: true }
      )
    ])
  ])
];
