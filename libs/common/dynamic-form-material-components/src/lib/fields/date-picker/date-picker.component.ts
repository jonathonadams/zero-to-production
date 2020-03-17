import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Injectable
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  MAT_DATE_FORMATS,
  NativeDateAdapter,
  DateAdapter
} from '@angular/material/core';
import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import {
  FormGroupTypes,
  DynamicFormService,
  IDatePickerField
} from '@uqt/common/dynamic-form';

function isValidDate(date: Date): Boolean {
  return date instanceof Date && !isNaN(date as any);
}

const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

@Injectable()
export class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    // if (displayFormat === 'input') {
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    // const year = date.getFullYear();

    // return `${day}-${month}-${year}`;
    // return date.toLocaleDateString();
    // }

    return date.toLocaleDateString();
  }

  parse(value: string): Date | null {
    // TODO -> i18n localTimeformat
    // https://angular.io/guide/i18n#i18n-pipes
    const [day, month, year] = value.split(/\/|-/g);
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (isValidDate(date)) {
      return date;
    } else {
      return null;
    }
  }
}

/**
 * Dynamic form date picker component. Not as simple as the other input field because the value returned is a Date object.
 * The date object is not serializable, so need to create an internal form group and intercept the changing value and then
 * format, then set the stringified format of the top level group.
 *
 * The date format could be customized, or dynamic if you choose
 *
 * @export
 * @class DatePickerComponent
 */
@Component({
  selector: 'uqt-form-date-picker',
  templateUrl: './date-picker.component.html',
  styles: [
    `
      :host {
        display: block;
      }
      .mat-form-field {
        width: 100%;
      }
    `
  ],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDatePickerComponent implements OnDestroy {
  private sub: Subscription = new Subscription();

  dateField: IDatePickerField;
  dateGroup: FormGroup;
  dateControl: FormControl;
  _group: FormGroup | undefined;

  @Input() idx: number; // Only accessed if it is a FormArrayGroup
  @Input() type: FormGroupTypes;

  @Input()
  set group(fg: FormGroup | undefined) {
    if (fg) {
      this.listenToStatusChanges(fg);
    }
    this._group = fg;
  }

  @Input()
  set field(f: IDatePickerField) {
    const ctrl = this.addControlToGroup(f);
    this.dateGroup.addControl(f.name, ctrl);
    this.dateField = f;
    this.listenToControlChange(ctrl);
  }

  constructor(private fb: FormBuilder, private service: DynamicFormService) {
    this.dateGroup = this.fb.group({});
  }

  addControlToGroup(f: IDatePickerField) {
    return this.service.createControl(f);
  }

  /**
   * Listen to the change of the date adapter and set the value of the control on the top level form group
   *
   * @param {FormControl} control
   * @memberof DatePickerComponent
   */
  listenToControlChange(control: FormControl) {
    this.sub.add(
      control.valueChanges
        .pipe(
          debounceTime(200),
          filter(val => val !== null)
        )
        .subscribe((date: Date) => {
          // There would be no chance for the group to no be set by the time
          // it is rendered on the DOM, but just in case.
          if (this._group !== undefined && isValidDate(date)) {
            const groupCtrl = this._group.controls[this.dateField.name];
            groupCtrl.setValue(this.formatDateToString(date));
            groupCtrl.markAsDirty();
          }
        })
    );
  }

  listenToStatusChanges(formGroup: FormGroup) {
    this.sub.add(
      formGroup.statusChanges.subscribe(status => {
        if (status === 'DISABLED') {
          this.dateGroup.disable();
        } else {
          this.dateGroup.enable();
        }
      })
    );
  }

  formatDateToString(date: Date): string {
    return date.toLocaleDateString();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
