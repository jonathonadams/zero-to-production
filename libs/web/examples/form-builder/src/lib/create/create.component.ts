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
import { RouterFacade } from '@uqt/data-access/router';
import {
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes,
  DynamicFormFacade
} from '@uqt/data-access/dynamic-form';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
      },
      {
        componentType: FormFieldTypes.Toggle,
        name: 'animations',
        label: 'Animations'
      },
      {
        componentType: FormFieldTypes.Toggle,
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
    private formsFacade: FormBuilderFacade,
    private routerFacade: RouterFacade,
    private router: Router
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
    this.dynamicFormFacade.setStructure(this.formName, STRUCTURE);
    this.formsFacade.clearSelected();
    this.formsFacade.loadForms();
  }

  edit(form: IFormBuilderStructure) {
    this.formsFacade.selectForm(form.id);
    this.router.navigate(['examples', 'form-builder', form.id, 'edit']);
  }

  delete(form: IFormBuilderStructure) {
    this.formsFacade.deleteForm(form);
  }

  display(form: IFormBuilderStructure) {
    this.formsFacade.selectForm(form.id);
    this.router.navigate(['examples', 'form-builder', form.id, 'display']);
  }

  trackForms(i: number, f: IFormBuilderStructure) {
    return f.id;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
