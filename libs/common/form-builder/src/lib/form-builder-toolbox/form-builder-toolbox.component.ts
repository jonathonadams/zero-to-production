import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroupTypes, FormFieldTypes } from '@ztp/common/dynamic-form';
import { Observable } from 'rxjs';
import {
  faPen,
  faCalendarAlt,
  faList,
  faCheckSquare,
  faToggleOn,
  faAlignJustify,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilderConstructorService } from '../form-constructor.service';

@Component({
  selector: 'ztp-form-builder-toolbox',
  templateUrl: './form-builder-toolbox.component.html',
  styleUrls: ['./form-builder-toolbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderToolboxComponent {
  toolBoxGroupId: string;
  toolBoxFieldId: string;
  dropListIds$: Observable<string[]>;

  constructor(private service: FormBuilderConstructorService) {
    this.toolBoxFieldId = this.service.toolBoxFieldId;
    this.toolBoxGroupId = this.service.toolBoxGroupId;
    this.dropListIds$ = this.service.dropListIds$;
  }

  groupTypes = [
    { display: 'Group', value: FormGroupTypes.Group, icon: faObjectGroup },
    // { display: 'Array', value: FormGroupTypes.Array, icon: faLayerGroup }
  ];

  fieldTypes = [
    { display: 'Input', value: FormFieldTypes.Input, icon: faPen },
    { display: 'Date', value: FormFieldTypes.DatePicker, icon: faCalendarAlt },
    { display: 'Select', value: FormFieldTypes.Select, icon: faList },
    {
      display: 'Checkbox',
      value: FormFieldTypes.CheckBox,
      icon: faCheckSquare,
    },
    {
      display: 'Text Area',
      value: FormFieldTypes.TextArea,
      icon: faAlignJustify,
    },
  ];
}
