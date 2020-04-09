import { query, style, group, animate, animation } from '@angular/animations';

export const slideAnimation = animation([
  style({ position: 'relative' }),
  query(':enter, :leave', [style({ position: 'absolute', width: '100%' })], {
    optional: true,
  }),
  query(':enter', [style({ transform: '{{ enter }}' })]),
  group([
    query(':leave', [
      animate('{{ timing }} ease-in', style({ transform: '{{exit}}' })),
    ]),
    query(':enter', [
      animate('{{ timing }} ease-out', style({ transform: 'none' })),
    ]),
  ]),
]);
