import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  FormBuilderFacade,
  IFormBuilderStructure
} from '@uqt/data-access/form-builder';
import {
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes,
  DynamicFormFacade
} from '@uqt/data-access/dynamic-form';
import { Validators } from '@angular/forms';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'config',
    groupType: FormGroupTypes.Group,
    cssClasses: ['form-builder-create'],
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'formName',
        label: 'Form Name',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.CheckBox,
        name: 'animations',
        label: 'Animations'
      },
      {
        componentType: FormFieldTypes.CheckBox,
        name: 'pagination',
        label: 'Section Pagination'
      }
    ]
  }
];

@Component({
  selector: 'uqt-example-form-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCreateFormComponent implements OnInit, OnDestroy {
  readonly formName = 'form-builder-create';
  form$: Observable<IFormBuilderStructure[]>;
  sub: Subscription;

  constructor(
    private dynamicFormFacade: DynamicFormFacade,
    private formsFacade: FormBuilderFacade
  ) {
    this.form$ = this.formsFacade.form$;

    this.dynamicFormFacade.createFormIfNotExist(this.formName);

    this.sub = this.dynamicFormFacade
      .formSubmits$(this.formName)
      .subscribe((form: IFormBuilderStructure) => {
        this.formsFacade.createForm({ ...form, formGroups: [] });
      });
  }

  ngOnInit() {
    this.dynamicFormFacade.setFormConfig(this.formName, {
      structure: STRUCTURE
    });
    this.formsFacade.loadForms();
  }

  edit(form: IFormBuilderStructure) {
    this.formsFacade.selectForm(form.id);
  }

  delete(form: IFormBuilderStructure) {
    this.formsFacade.deleteForm(form);
  }

  trackForms(i: number, f: IFormBuilderStructure) {
    return f.id;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
