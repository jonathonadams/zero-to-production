import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroupTypes, FormFieldTypes } from '@uqt/data-access/dynamic-form';
import {
  faPen,
  faCalendarAlt,
  faList,
  faCheckSquare,
  faToggleOn,
  faAlignJustify,
  faObjectGroup
} from '@fortawesome/free-solid-svg-icons';

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

  groupTypes = [
    { display: 'Group', value: FormGroupTypes.Group, icon: faObjectGroup }
    // { display: 'Array', value: FormGroupTypes.Array, icon: faLayerGroup }
  ];

  fieldTypes = [
    { display: 'Input', value: FormFieldTypes.Input, icon: faPen },
    { display: 'Date', value: FormFieldTypes.DatePicker, icon: faCalendarAlt },
    { display: 'Select', value: FormFieldTypes.Select, icon: faList },
    {
      display: 'Checkbox',
      value: FormFieldTypes.CheckBox,
      icon: faCheckSquare
    },
    { display: 'Toggle', value: FormFieldTypes.Toggle, icon: faToggleOn },
    { display: 'Text Area', value: FormFieldTypes.Toggle, icon: faAlignJustify }
  ];

  // iconType(type: FormFieldTypes): IconDefinition {
  // switch (type) {
  //   case FormFieldTypes.CheckBox:
  //     return faCheckSquare;
  //   case FormFieldTypes.DatePicker:
  //     return faCalendarAlt;
  //   case FormFieldTypes.Input:
  //     return faPen;
  //   case FormFieldTypes.Select:
  //     return faList;
  //   case FormFieldTypes.TextArea:
  //     return faAlignJustify;
  //   case FormFieldTypes.Toggle:
  //     return faToggleOn;
  // }
}
