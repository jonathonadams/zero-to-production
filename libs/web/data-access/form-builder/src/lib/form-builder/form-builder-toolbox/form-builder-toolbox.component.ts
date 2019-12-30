import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroupTypes, FormFieldTypes } from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-form-builder-toolbox',
  templateUrl: './form-builder-toolbox.component.html',
  styleUrls: ['./form-builder-toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderToolboxComponent {
  @Input() toolBoxGroupId: string;
  @Input() toolBoxFieldId: string;
  @Input() dropListIds: string[];

  groupTypes = [{ display: 'Group', value: FormGroupTypes.Group }];

  fieldTypes = [
    { display: 'Input', value: FormFieldTypes.Input },
    { display: 'Date', value: FormFieldTypes.DatePicker },
    { display: 'Select', value: FormFieldTypes.Select },
    { display: 'Checkbox', value: FormFieldTypes.CheckBox },
    { display: 'Toggle', value: FormFieldTypes.Toggle }
  ];
}
