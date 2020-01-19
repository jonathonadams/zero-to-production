import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  DynamicFormFacade,
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes,
  InputFieldTypes,
  FormArrayTypes
} from '@uqt/data-access/dynamic-form';
import { CodeHighlightService } from '@uqt/web/examples/code-highlight';
import { IExample, ExamplesFacade } from '@uqt/examples/data-access';
import {
  markup,
  submitSyntax,
  moduleRegistry,
  setStructureMarkup
} from './dynamic-form.code';

const SIMPLE_FORM: TFormGroups = [
  {
    groupName: 'contactDetails',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        type: FormFieldTypes.Input,
        name: 'contactNumber',
        label: 'Contact Number',
        validators: [Validators.required]
      },
      {
        type: FormFieldTypes.Input,
        inputType: InputFieldTypes.Email,
        name: 'emailAddress',
        label: 'Email Address',
        validators: [Validators.required, Validators.email]
      }
    ]
  }
];

const COMPLEX_FORM: TFormGroups = [
  {
    groupName: 'userDetails',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        type: FormFieldTypes.Input,
        name: 'givenName',
        label: 'Given Name',
        autocomplete: 'given-name',
        validators: [Validators.required]
      },
      {
        type: FormFieldTypes.Input,
        name: 'surname',
        autocomplete: 'family-name',
        label: 'Email Address'
      }
    ]
  }
  // {
  //   groupName: 'contactDetails',
  //   groupType: FormGroupTypes.Array,
  //   arrayType: FormArrayTypes.Field,
  //   initialNumber: 3,
  //   field: {
  //     type: FormFieldTypes.Input,
  //     name: 'contactDetails',
  //     label: 'Contact Details'
  //   }
  // },
  // {
  //   groupName: 'someMoreDetails',
  //   groupType: FormGroupTypes.Array,
  //   arrayType: FormArrayTypes.Group,
  //   initialNumber: 3,
  //   fields: [
  //     {
  //       type: FormFieldTypes.Input,
  //       name: 'phone',
  //       label: 'Phone Number'
  //     },
  //     {
  //       type: FormFieldTypes.Input,
  //       name: 'email',
  //       label: 'Email Address'
  //     }
  //   ]
  // }
];

@Component({
  selector: 'uqt-example-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDynamicFormComponent implements OnInit, AfterViewInit {
  readonly formName = 'dynamic-form-example';
  example$: Observable<IExample | undefined>;
  simpleStructure = true;
  submit$: Observable<any>;

  setStructureMarkup = setStructureMarkup;
  markup = markup;
  submitSyntax = submitSyntax;
  moduleRegistry = moduleRegistry;

  constructor(
    private facade: ExamplesFacade,
    private formFacade: DynamicFormFacade,
    private highlight: CodeHighlightService
  ) {
    this.example$ = this.facade.selectExampleById('1'); // hard coded because it is first and not coming from the db
    this.formFacade.createFormIfNotExist(this.formName);
    this.submit$ = this.formFacade.formSubmits$(this.formName);
  }

  ngOnInit() {
    this.formFacade.setFormConfig(this.formName, { structure: SIMPLE_FORM });
  }

  ngAfterViewInit() {
    this.highlight.highlightAll();
  }

  setStructure(simpleForm: boolean) {
    if (simpleForm) {
      this.formFacade.setFormConfig(this.formName, { structure: SIMPLE_FORM });
    } else {
      this.formFacade.setFormConfig(this.formName, { structure: COMPLEX_FORM });
    }
    this.simpleStructure = simpleForm;
  }

  toggleAnimations(change: MatSlideToggleChange) {
    this.formFacade.setFormConfig(this.formName, {
      animations: change.checked
    });
  }

  togglePagination(change: MatSlideToggleChange) {
    this.formFacade.setFormConfig(this.formName, {
      paginateSections: change.checked
    });
  }
}
