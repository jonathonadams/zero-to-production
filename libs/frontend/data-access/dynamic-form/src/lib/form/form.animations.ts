import {
  animate,
  trigger,
  transition,
  style,
  state,
  keyframes,
  query,
  stagger,
  group,
  sequence
} from '@angular/animations';

// export const dynamicFormTransitions = trigger('flyInOut', [
//   transition(':enter', [
//     // style({ transform: 'translateX(200%)' }),
//     // animate('1s ease-in-out', style({ transform: 'none' })),
//     query('.form-field', [
//       style({ opacity: 0, transform: 'translateY(100%)' }),
//       stagger('.15s', [
//         animate(
//           '.15s',
//           style({
//             opacity: 1,
//             transform: 'none'
//           })
//         )
//       ])
//     ])
//   ]),
//   transition(':leave', [
//     query('.form-field', [
//       style({ opacity: 1, transform: 'none' }),
//       stagger('.15s', [
//         animate(
//           '.15s',
//           style({
//             opacity: 1,
//             transform: 'translateY(-100%)'
//           })
//         )
//       ])
//     ])

//     // style({ width: '*' }),
//     // animate(1000, style({ width: 0 }))
//   ])
// ]);

export const dynamicFormTransitions = trigger('flyInOut', [
  transition(':enter', [
    style({ width: 0, transform: 'translateX(50%)', opacity: 0 }),
    group([
      animate(
        '0.3s 0.1s ease',
        style({
          transform: 'none',
          width: '*'
        })
      ),
      animate(
        '0.3s ease',
        style({
          opacity: 1
        })
      )
    ])
  ])
  // transition(':leave', [
  //   style({ width: '*', transform: 'translateX(-50%)', opacity: 1 }),
  //   group([
  //     animate(
  //       '0.3s ease',
  //       style({
  //         transform: 'translateX(50px)',
  //         width: 0
  //       })
  //     ),
  //     animate(
  //       '0.3s 0.2s ease',
  //       style({
  //         opacity: 0
  //       })
  //     )
  //   ])
  // ])
]);

// export const dynamicFormTransitions = trigger('flyInOut', [
//   transition(':enter', [
//     style({ opacity: 0 }),
//     animate('2s', style({ opacity: 1 }))
//   ]),
//   transition(':leave', [
//     style({ opacity: 1 }),
//     animate('2s', style({ opacity: 0 }))
//   ])
// ]);

// export const dynamicFormTransitions = trigger('flyInOut', [
//   transition(':enter', [
//     animate(
//       '5s',
//       keyframes([
//         style({ opacity: 0, height: 0, offset: 0 }),
//         style({ opacity: 1, offset: 0.5 }),
//         style({ height: '*', offset: 1 })
//       ])
//     )
//   ]),
//   transition(':leave', [
//     style({ opacity: 1, height: '*' }),
//     animate('1s ease-out', style({ opacity: 0, height: 0 }))
//   ])
// ]);
