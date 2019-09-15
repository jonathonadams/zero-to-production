import { trigger, animate, transition, style } from '@angular/animations';

/**
 * How to use
 *
 * <td mat-cell *matCellDef="let element"><span [@cellHighlightAnimation]="value">{{ value }}</span></td>
 */
export const CELL_HIGHLIGHT_ANIMATIONS = trigger('cellHighlightAnimation', [
  transition(':increment', [
    style({
      boxShadow: '0 0 2em #009882'
    }),
    animate('2s ease', style({ boxShadow: '0 0 2em rgba(0,0,0,0)' }))
  ]),
  transition(':decrement', [
    style({
      boxShadow: '0 0 2em #ff4181'
    }),
    animate('2s ease', style({ boxShadow: '0 0 2em rgba(0,0,0,0)' }))
  ])
  // transition('* => *', [
  //   style({
  //     boxShadow: '0 0 2em #009882',
  //     position: 'absolute'
  //   }),
  //   animate("1s ease-in-out", style({ boxShadow: '0 0 2em rgba(0,0,0,0)' }))
  // ])
]);
