import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DynamicFormFacade,
  TFormGroups,
  FormFieldTypes,
  FormGroupTypes
} from '@ngw/frontend/data-access/dynamic-form';
import { FormsFacade } from '../+state/form-builder.facade';
import { IForm } from '../form-builder.model';
import { Observable } from 'rxjs';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'config',
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

  // {
  //   formGroup: 'for',
  //   groupType: FormGroupTypes.Array,
  //   arrayType: FormArrayTypes.Field,
  //   initialNumber: 2,
  //   field: {
  //     componentType: FormFieldTypes.Input,
  //     type: 'text',
  //     name: 'label',
  //     label: 'Field Label',
  //     validators: [Validators.required]
  //   }
  // },
  // {
  //   formGroup: 'credentialsArray',
  //   groupType: FormGroupTypes.Array,
  //   arrayType: FormArrayTypes.Group,
  //   fields: [
  //     {
  //       componentType: FormFieldTypes.Input,
  //       type: 'text',
  //       name: 'username',
  //       label: 'Username',
  //       autocomplete: 'username',
  //       validators: [Validators.required]
  //     },
  //     {
  //       componentType: FormFieldTypes.Input,
  //       type: 'password',
  //       name: 'password',
  //       label: 'Password',
  //       autocomplete: 'current-password',
  //       validators: [Validators.required]
  //     }
  //   ]
  // }
];

@Component({
  selector: 'ngw-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent {
  selectedForm$: Observable<IForm | undefined>;

  constructor(
    private facade: FormsFacade,
    private dynamicFormFacade: DynamicFormFacade
  ) {
    this.selectedForm$ = this.facade.selectedForm$;
  }
}
