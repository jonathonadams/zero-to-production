import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  DynamicFormFacade,
  TFormGroups,
  FormFieldTypes,
  FormGroupTypes,
  FormArrayTypes
} from '@ngw/frontend/data-access/dynamic-form';
import { Validators } from '@angular/forms';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'sections',
    groupType: FormGroupTypes.Array,
    arrayType: FormArrayTypes.Field,
    initialNumber: 2,
    field: {
      componentType: FormFieldTypes.Input,
      type: 'text',
      name: 'label',
      label: 'Field Label',
      validators: [Validators.required]
    }
  },
  {
    formGroup: 'credentialsArray',
    groupType: FormGroupTypes.Array,
    arrayType: FormArrayTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'username',
        label: 'Username',
        autocomplete: 'username',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'password',
        name: 'password',
        label: 'Password',
        autocomplete: 'current-password',
        validators: [Validators.required]
      }
    ]
  },
  {
    formGroup: 'credentials',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'username',
        label: 'Username',
        autocomplete: 'username',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'password',
        name: 'password',
        label: 'Password',
        autocomplete: 'current-password',
        validators: [Validators.required]
      }
    ]
  }
];

@Component({
  selector: 'ngw-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent implements OnInit {
  constructor(private dynamicFormFacade: DynamicFormFacade) {
    this.dynamicFormFacade.submit$.subscribe(fields => {
      console.log(fields);
    });
  }

  ngOnInit() {
    this.dynamicFormFacade.setStructure({ structure: STRUCTURE });
  }

  addFormSection() {}
}
