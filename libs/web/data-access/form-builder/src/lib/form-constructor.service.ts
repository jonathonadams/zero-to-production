import { Injectable } from '@angular/core';
import map from 'ramda/es/map';
import {
  IFormGroup,
  TField,
  FormFieldTypes,
  FormGroupTypes,
  DynamicFormState
} from '@uqt/data-access/dynamic-form';
import {
  IFormBuilderStructure,
  IFormBuilderField,
  IFormBuilderGroup
} from './form-builder.interface';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormBuilderConstructorService {
  constructor(private fb: FormBuilder) {}

  formBuilder(structure: IFormBuilderStructure): FormGroup {
    // Top level group
    const form = this.fb.group({
      config: this.fb.group({
        formName: [structure.config.formName],
        animations: [structure.config.animations],
        pagination: [structure.config.pagination]
      }),
      formGroups: this.fb.array([])
    });

    structure.formGroups.forEach(group => {
      const builderGroup = this.createFormGroupFromGroup(group);
      const fieldsArray = builderGroup.get('fields') as FormArray;

      group.fields.forEach(field => {
        fieldsArray.push(this.createFieldGroupFromFiled(field));
      });

      (form.get('formGroups') as FormArray).push(builderGroup);
    });

    return form;
  }

  createFormGroupFromGroup(group: IFormBuilderGroup): FormGroup {
    return this.fb.group({
      groupName: [group.groupName],
      fields: this.fb.array([])
    });
  }

  createFieldGroupFromFiled(field: IFormBuilderField) {
    return this.fb.group({
      fieldName: [field.fieldName],
      fieldType: [field.fieldType],
      fieldLabel: [field.fieldLabel]
    });
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      groupName: [],
      fields: this.fb.array([])
    });
  }

  createFieldGroup() {
    return this.fb.group({
      fieldName: [],
      fieldType: [],
      fieldLabel: []
    });
  }

  creteDyanmicFormStructureFromBuilderConfig({
    config,
    formGroups
  }: IFormBuilderStructure): DynamicFormState {
    return {
      config: {
        formName: config.formName,
        animations: config.animations ? config.animations : false,
        paginateSections: config.pagination ? config.pagination : false,
        structure: map(mapToFormGroup, formGroups),
        formValidators: []
      },
      index: 0,
      data: {},
      errors: []
    };
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

  /**
   * Remove the group from the old section and add to the new
   * @param newArrayGroup
   * @param previousArrayGroup
   * @param newIndex
   * @param previousIndex
   */
  moveBetweenArrayGroup(
    newArrayGroup: FormArray,
    previousArrayGroup: FormArray,
    newIndex: number,
    previousIndex: number
  ): void {
    const controlBeingMoved = previousArrayGroup.at(previousIndex);
    previousArrayGroup.removeAt(previousIndex);
    newArrayGroup.insert(newIndex, controlBeingMoved);
  }
}

function mapToFormField(field: IFormBuilderField): TField {
  return {
    componentType: FormFieldTypes.Input, // TODO -> Dynamic
    name: field.fieldName,
    type: 'text',
    label: field.fieldLabel
  };
}

function mapToFormGroup(group: IFormBuilderGroup): IFormGroup {
  return {
    formGroup: group.groupName,
    groupType: FormGroupTypes.Group,
    fields: map(mapToFormField, group.fields)
  };
}
