import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { FormsFacade } from '../+state/form-builder.facade';
import { IFormBuilderStructure } from '@ngw/types';

@Component({
  selector: 'ngw-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent {
  builderForm: FormGroup;
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  constructor(private fb: FormBuilder, private formsFacade: FormsFacade) {
    this.selectedForm$ = this.formsFacade.selectedForm$;

    this.builderForm = this.fb.group({
      config: this.fb.group({
        formName: [],
        animations: [],
        showSections: []
      }),
      formGroups: this.fb.array([])
    });

    (this.selectedForm$ as Observable<IFormBuilderStructure>)
      .pipe(
        filter(config => config !== undefined),
        take(1)
      )
      .subscribe(config => {
        this.createFormFromStructure(config);
        this.builderForm.reset(config);
      });
  }

  createFormFromStructure(structure: IFormBuilderStructure) {
    structure.formGroups.forEach((group, i) => {
      this.addFormGroup();
      group.fields.forEach(field => {
        this.addGroupField(i);
      });
    });
  }

  get formGroups() {
    return this.builderForm.get('formGroups') as FormArray;
  }

  getGroupFields(index: number) {
    return (this.formGroups.get(`${index}`) as FormGroup).get(
      'fields'
    ) as FormArray;
  }

  addFormGroup() {
    this.formGroups.push(
      this.fb.group({
        groupName: [],
        fields: this.fb.array([])
      })
    );
  }

  addGroupField(groupIndex: number) {
    this.getGroupFields(groupIndex).push(this.createFieldGroup());
  }

  createFieldGroup() {
    return this.fb.group({
      fieldName: [],
      fieldType: [],
      fieldLabel: []
    });
  }

  onSubmit({ valid, value }: FormGroup) {
    if (valid) {
      this.selectedForm$.pipe(take(1)).subscribe(form => {
        this.formsFacade.updateForm({ ...form, ...value });
      });
    }
  }
}
