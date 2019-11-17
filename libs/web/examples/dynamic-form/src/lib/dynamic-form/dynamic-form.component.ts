import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicFormFacade } from '@ngw/data-access/dynamic-form';
import { TFormGroups } from '@ngw/types';
import { FormGroupTypes, FormFieldTypes } from '@ngw/enums';
import { Observable } from 'rxjs';

const CONTACT_DETAILS: TFormGroups = [
  {
    formGroup: 'contactDetails',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'contactNumber',
        label: 'Contact Number',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'email',
        name: 'emailAddress',
        label: 'Email Address',
        validators: [Validators.required, Validators.email]
      }
    ]
  }
];

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'userDetails',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'givenName',
        label: 'Given Name',
        autocomplete: 'given-name',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'surname',
        autocomplete: 'family-name',
        label: 'Email Address'
      }
    ]
  },
  {
    formGroup: 'additionalDetails',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.DatePicker,
        name: 'dateOfBirth',
        label: 'Date Of Birth',
        autocomplete: 'bday',
        validators: [Validators.required]
      }
    ]
  }
];

@Component({
  selector: 'ex-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDynamicFormComponent implements OnInit {
  toggleStructure = true;
  animations = true;
  pagination = true;
  submit$: Observable<any>;

  constructor(private formFacade: DynamicFormFacade) {
    this.submit$ = formFacade.submit$;
  }

  ngOnInit() {
    this.formFacade.setStructure({ structure: STRUCTURE });
  }

  toggleFormStructure() {
    this.toggleStructure = !this.toggleStructure;
    this.formFacade.setStructure({
      structure: this.toggleStructure ? STRUCTURE : CONTACT_DETAILS
    });
  }

  toggleAnimations() {
    this.animations = !this.animations;
    this.formFacade.setFormConfig({ animations: this.animations });
  }

  togglePagination() {
    this.pagination = !this.pagination;
    this.formFacade.setFormConfig({ paginateSections: this.pagination });
  }
}
