import { animate, style, transition, trigger } from '@angular/animations';

export const SLIDE_ANIMATION = trigger('slideAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(+200%)' }),
    animate(
      '2s cubic-bezier(.35,0,.25,1)',
      style({ opacity: 1, transform: 'translateY(+100%)' })
    ),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(+100%)' }),
    animate(
      '2s cubic-bezier(.35,0,.25,1)',
      style({ opacity: 0, transform: 'translateY(-200%)' })
    ),
  ]),
]);
