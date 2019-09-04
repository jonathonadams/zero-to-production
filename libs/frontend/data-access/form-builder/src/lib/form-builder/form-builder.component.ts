import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  DynamicFormFacade,
  TFormGroups,
  FormFieldTypes,
  FormGroupTypes
} from '@ngw/frontend/data-access/dynamic-form';
import { Validators } from '@angular/forms';

// export type TField =
//   | IInputField
//   | ISelectField
//   | IToggleField
//   | IDatePickerField
//   | ITextArea;

// export interface IBaseField {
//   name: string;
//   label: string;
//   initialValue?: any;
//   validators?: ValidatorFn[];
//   asyncValidators?: Type<AsyncValidator>[];
//   autocomplete?: TAutoComplete;
//   appearance?: TFormFieldAppearance;
//   color?: string;
//   attrs?: any;
//   customComponent?: Type<any>;
// }

const STRUCTURE: TFormGroups = [
  {
    name: 'sections',
    type: FormGroupTypes.Array,
    initialNumber: 2,
    field:
      // {
      //   componentType: FormFieldTypes.Select,
      //   name: 'fieldType',
      //   label: 'Field Type',
      //   validators: [Validators.required],
      //   selectOptions: [
      //     {
      //       display: 'Input',
      //       value: FormFieldTypes.Input
      //     },
      //     {
      //       display: 'Select',
      //       value: FormFieldTypes.Select
      //     }
      //   ]
      // },
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'label',
        label: 'Field Label',
        validators: [Validators.required]
      }
    // {
    //   componentType: FormFieldTypes.Input,
    //   type: 'text',
    //   name: 'fieldName',
    //   label: 'Field Name',
    //   validators: [Validators.required]
    // }
  },
  {
    name: 'credentials',
    type: FormGroupTypes.Group,
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
