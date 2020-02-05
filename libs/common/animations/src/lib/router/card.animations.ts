import {
  animate,
  group,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';

export const cardAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(+200%)' }),
    animate(
      '2s cubic-bezier(.35,0,.25,1)',
      style({ opacity: 1, transform: 'translateY(+100%)' })
    )
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(+100%)' }),
    animate(
      '2s cubic-bezier(.35,0,.25,1)',
      style({ opacity: 0, transform: 'translateY(-200%)' })
    )
  ])

  // transition(':enter', [
  //   // group([
  //   // query(
  //   //   ':leave',
  //   //   stagger('100ms', [
  //   style({ opacity: 0 }),
  //   // style({ opacity: 0, transform: 'translateY(100%)' }),
  //   animate(
  //     '4000ms cubic-bezier(.35,0,.25,1)',
  //     style({ opacity: 1, transform: 'translateY(0%)' })
  //   )
  //   // ])
  // ]),

  // transition(':leave', [
  //   // group([
  //   // query(
  //   //   ':leave',
  //   //   stagger('100ms', [
  //   style({ transform: 'translateY(0%)', opacity: 1 }),
  //   animate(
  //     '4000ms cubic-bezier(.35,0,.25,1)',
  //     style({ transform: 'translateY(+200%)', opacity: 0 })
  //   )
  //   // ])
  // ])

  // query(
  //   ':enter',
  //   stagger('100ms', [
  //     animate(
  //       '400ms cubic-bezier(.35,0,.25,1)',
  //       style({ opacity: 1, transform: 'translateY(0%)' })
  //     )
  //   ])
  // )
  // )
  // ])
]);
//   transition(':leave', [])

//   // this occurs between each route change
//   transition('* => *', [
//     // route-level animations require that both the new and old pages are
//     // aligned at the top of the container using absolute positioning. The
//     // top container (the one with [@routerAnimations]) needs to relative...
//     style({ position: 'relative', overflow: 'hidden' }),
//     query(
//       ':enter, :leave',
//       style({ position: 'absolute', top: 0, left: 0, right: 0 })
//     ),

//     query(':enter mat-card', [
//       style({ opacity: 0, transform: 'translateY(100%)' })
//     ]),

//     // animate away an in each of the cards on the pages
//     group([
//       query(
//         ':leave mat-card',
//         stagger('100ms', [
//           animate(
//             '400ms cubic-bezier(.35,0,.25,1)',
//             style({ transform: 'translateY(+200%)', opacity: 0 })
//           )
//         ])
//       ),
//       query(
//         ':enter mat-card',
//         stagger('100ms', [
//           animate(
//             '400ms cubic-bezier(.35,0,.25,1)',
//             style({ opacity: 1, transform: 'translateY(0%)' })
//           )
//         ])
//       )
//     ])
//   ])
// ]);

// export const ROUTER_ANIMATIONS = trigger('cardAnimations', [
//   // this will skip on load
//   transition(':enter, initial => *', []),

//   // this occurs between each route change
//   transition('* => *', [
//     // route-level animations require that both the new and old pages are
//     // aligned at the top of the container using absolute positioning. The
//     // top container (the one with [@routerAnimations]) needs to relative...
//     style({ position: 'relative' }),
//     query(
//       ':enter, :leave',
//       style({ position: 'absolute', top: 0, left: 0, right: 0 })
//     ),
//     // hide all the cards since each route makes use of that
//     query(':enter mat-card', [
//       style({ opacity: 0, transform: 'translateY(100%)' })
//     ]),

//     // animate away an in each of the cards on the pages
//     group([
//       query(
//         ':leave mat-card',
//         stagger('100ms', [
//           animate(
//             '400ms cubic-bezier(.35,0,.25,1)',
//             style({ transform: 'translateY(+200%)', opacity: 0 })
//           )
//         ])
//       ),
//       query(
//         ':enter mat-card',
//         stagger('100ms', [
//           animate(
//             '400ms cubic-bezier(.35,0,.25,1)',
//             style({ opacity: 1, transform: 'translateY(0%)' })
//           )
//         ])
//       )
//     ])
//   ])
// ]);
