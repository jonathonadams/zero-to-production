import { trigger, style, transition, animate } from '@angular/animations';

export const expandAnimation = trigger('expand', [
  transition(':enter', [
    style({ height: '0px', opacity: '0' }),
    animate(
      '225ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ height: '*', opacity: '1' })
    )
  ]),
  transition(':leave', [
    style({ height: '*', opacity: '1' }),
    animate(
      '225ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      style({ height: '0px', opacity: '0' })
    )
  ])
]);
