import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { FormFieldTypes, InputFieldTypes } from '@uqt/common/dynamic-form';
import {
  faPen,
  faCalendarAlt,
  faCheckSquare,
  faList,
  faToggleOn,
  faAlignJustify,
  IconDefinition,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { expandAnimation } from '../../form.animation';

@Component({
  selector: 'uqt-form-builder-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandAnimation],
})
export class FormBuilderFieldComponent {
  faTrash = faTrash;
  faPlus = faPlus;

  inputFieldTypes = [
    { display: 'Text', value: InputFieldTypes.Text },
    { display: 'Email', value: InputFieldTypes.Email },
    { display: 'Number', value: InputFieldTypes.Number },
    { display: 'Password', value: InputFieldTypes.Password },
    { display: 'Tel', value: InputFieldTypes.Tel },
    { display: 'Time', value: InputFieldTypes.Time },
    { display: 'Url', value: InputFieldTypes.Url },
  ];

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
  @HostListener('click')
  onClick() {
    this.showConfig = !this.showConfig;
  }

  getSelectOptions(formGroup: AbstractControl) {
    return formGroup.get('selectOptions') as FormArray;
  }

  iconType(type: FormFieldTypes): IconDefinition {
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
