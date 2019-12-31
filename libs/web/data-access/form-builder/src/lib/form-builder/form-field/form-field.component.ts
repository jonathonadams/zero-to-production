import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { FormFieldTypes } from '@uqt/data-access/dynamic-form';
import {
  faPen,
  faCalendarAlt,
  faCheckSquare,
  faList,
  faToggleOn,
  faAlignJustify
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'uqt-form-builder-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderFieldComponent {
  @Input() form: FormGroup;
  @Input() field: AbstractControl;
  @Input() groupIndex: number;
  @Input() fieldIndex: number;
  @Output() remove = new EventEmitter<{
    groupIndex: number;
    fieldIndex: number;
  }>();

  @Output() addSelectOption = new EventEmitter<{
    groupIndex: number;
    fieldIndex: number;
  }>();

  @Output() deleteSelectOption = new EventEmitter<{
    groupIndex: number;
    fieldIndex: number;
    optionIndex: number;
  }>();

  showConfig = false;
  toggleConfig() {
    this.showConfig = !this.showConfig;
  }

  getSelectOptions(formGroup: AbstractControl) {
    return formGroup.get('selectOptions') as FormArray;
  }

  iconType(type: FormFieldTypes) {
    switch (type) {
      case FormFieldTypes.CheckBox:
        return faCheckSquare;
      case FormFieldTypes.DatePicker:
        return faCalendarAlt;
      case FormFieldTypes.Input:
        return faPen;
      case FormFieldTypes.Select:
        return faList;
      case FormFieldTypes.TextArea:
        return faAlignJustify;
      case FormFieldTypes.Toggle:
        return faToggleOn;
    }
  }
}
