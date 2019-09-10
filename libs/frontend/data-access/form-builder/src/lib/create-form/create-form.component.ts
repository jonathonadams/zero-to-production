import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DynamicFormFacade,
  TFormGroups,
  FormFieldTypes,
  FormGroupTypes
} from '@ngw/frontend/data-access/dynamic-form';
import { FormsFacade } from '../+state/form-builder.facade';
import { IForm } from '../form-builder.model';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'newForm',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'formName',
        label: 'FormName',
        validators: [Validators.required]
      }
    ]
  }
];

@Component({
  selector: 'ngw-form-builder-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFormComponent implements OnInit {
  constructor(
    private facade: FormsFacade,
    private dynamicFormFacade: DynamicFormFacade
  ) {
    this.dynamicFormFacade.submit$.subscribe(
      ({ newForm }: { newForm: IForm }) => {
        this.facade.createForm(newForm);
      }
    );
  }

  ngOnInit() {
    this.dynamicFormFacade.setStructure({ structure: STRUCTURE });
  }
}
