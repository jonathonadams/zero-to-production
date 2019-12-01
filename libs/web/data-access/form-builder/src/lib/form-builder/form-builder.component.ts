import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { FormBuilderFacade } from '../+state/form-builder.facade';
import { IFormBuilderStructure } from '../form-builder.models';

@Component({
  selector: 'uqt-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormBuilderComponent {
  builderForm: FormGroup;
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  constructor(private fb: FormBuilder, private facade: FormBuilderFacade) {
    this.selectedForm$ = this.facade.selectedForm$;

    this.builderForm = this.fb.group({
      config: this.fb.group({
        formName: [''],
        animations: [true],
        pagination: [true]
      }),
      formGroups: this.fb.array([])
    });
  }

  // createFormFromStructure(structure: IFormBuilderStructure) {
  //   structure.formGroups.forEach((group, i) => {
  //     this.addFormGroup();
  //     group.fields.forEach(field => {
  //       this.addGroupField(i);
  //     });
  //   });
  // }

  get formGroups() {
    return this.builderForm.get('formGroups') as FormArray;
  }

  getGroupFields(index: number) {
    return (this.formGroups.get(String(index)) as FormGroup).get(
      'fields'
    ) as FormArray;
  }

  addFormGroup() {
    this.formGroups.push(this.createFormGroup());
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      groupName: [],
      fields: this.fb.array([])
    });
  }

  addGroupField(groupIndex: number) {
    this.getGroupFields(groupIndex).push(this.createFieldGroup());
  }

  removeGroupField(groupIndex: number, fieldIndex: number) {
    this.getGroupFields(groupIndex).removeAt(fieldIndex);
  }

  createFieldGroup() {
    return this.fb.group({
      fieldName: [],
      fieldType: [],
      fieldLabel: []
    });
  }

  deleteFormGroup(i: number): void {
    this.formGroups.removeAt(i);
  }

  onSubmit({ valid, value }: FormGroup) {
    if (valid) {
      this.selectedForm$
        .pipe(
          take(1),
          filter(val => val !== undefined)
        )
        .subscribe(form => {
          this.facade.updateForm({ ...form, ...value });
        });
    }
  }

  reOrderFormGroups(event: CdkDragDrop<FormGroup[]>) {
    if (event.previousContainer === event.container) {
      this.moveFormArrayGroup(
        this.formGroups,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const formGroup = this.createFormGroup();
      this.formGroups.insert(event.currentIndex, formGroup);
    }
  }

  /**
   * Removes the FormGroup from it's current index and inserts it
   * at the new index value
   *
   * @param arrayGroup
   * @param currentIndex
   * @param newIndex
   */
  moveFormArrayGroup(
    arrayGroup: FormArray,
    currentIndex: number,
    newIndex: number
  ): void {
    const controlBeingRemoved = arrayGroup.at(currentIndex);
    arrayGroup.removeAt(currentIndex);
    arrayGroup.insert(newIndex, controlBeingRemoved);
  }
}
