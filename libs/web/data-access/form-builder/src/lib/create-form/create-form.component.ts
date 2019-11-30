import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  DynamicFormFacade,
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes
} from '@uqt/data-access/dynamic-form';
import { FormBuilderFacade } from '../+state/form-builder.facade';
import { IFormBuilderStructure } from '../form-builder.models';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'config',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'formName',
        label: 'Form Name',
        validators: [Validators.required]
      }
    ]
  }
];

@Component({
  selector: 'uqt-form-builder-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFormComponent implements OnInit {
  sub: Subscription;

  constructor(
    private facade: FormBuilderFacade,
    private dynamicFormFacade: DynamicFormFacade
  ) {
    this.sub = this.dynamicFormFacade.submit$.subscribe(
      (form: IFormBuilderStructure) => {
        this.facade.createForm({ ...form, formGroups: [] });
      }
    );
  }

  ngOnInit() {
    this.dynamicFormFacade.setStructure({ structure: STRUCTURE });
    this.facade.clearSelected();
    this.facade.loadForms();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
