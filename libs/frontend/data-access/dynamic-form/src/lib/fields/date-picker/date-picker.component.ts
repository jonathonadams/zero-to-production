import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TField } from '../../form.models';
import { FormGroup } from '@angular/forms';
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL'
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY'
//   }
// };

// const APP_DATE_FORMATS = {
//   parse: {
//     dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
//   },
//   display: {
//     dateInput: 'input',
//     monthYearLabel: { year: 'numeric', month: 'short' },
//     dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
//     monthYearA11yLabel: { year: 'numeric', month: 'long' }
//   }
// };

// export class MyDateAdapter extends NativeDateAdapter {
//   format(date: Date, displayFormat: Object): string {
//     console.log('INSIDE HERE .....');
//     console.log(displayFormat);

//     if (displayFormat === 'input') {
//       const day = date.getDate();
//       const month = date.getMonth() + 1;
//       const year = date.getFullYear();

//       return `${day}-${month}-${year}`;
//     }

//     return date.toDateString();
//   }
// }

@Component({
  selector: 'ngw-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent {
  @Input() field!: TField;
  @Input() group!: FormGroup;
}
