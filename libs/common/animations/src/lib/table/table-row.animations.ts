import { trigger, animate, transition, style } from '@angular/animations';

/**
 * How to use with mat table
 *
 * <tr mat-row [@tableRowAnimation] *matRowDef="let row; columns: displayedColumns;"></tr>
 */
export const TABLE_ROW_ANIMATIONS = trigger('tableRowAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-550px)' }),
    animate('.1s ease', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    animate('.1s ease', style({ opacity: 0, transform: 'translateX(+550px)' })),
  ]),
]);
