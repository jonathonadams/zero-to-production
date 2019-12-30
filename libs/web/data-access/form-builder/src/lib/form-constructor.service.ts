import { Injectable } from '@angular/core';
import {
  TField,
  IDynamicFormConfig,
  TFormGroup,
  FormFieldTypes,
  FormGroupTypes
} from '@uqt/data-access/dynamic-form';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormBuilderConstructorService {
  constructor(private fb: FormBuilder) {}

  formBuilder(config: IDynamicFormConfig): FormGroup {
    // Top level group
    const form = this.fb.group({
      config: this.fb.group({
        formName: [config.formName],
        animations: [config.animations],
        paginateSections: [config.paginateSections],
        structure: this.fb.array([])
      })
    });

    config.structure.forEach(group => {
      const builderGroup = this.createFormGroupFromGroup(group);
      const fieldsArray = builderGroup.get('fields') as FormArray;

      group.fields.forEach(field => {
        fieldsArray.push(this.createFieldGroupFromFiled(field));
      });

      ((form.get('config') as FormGroup).get('structure') as FormArray).push(
        builderGroup
      );
    });

    return form;
  }

  createFormGroupFromGroup(group: TFormGroup): FormGroup {
    return this.fb.group({
      groupName: [group.groupName],
      groupType: [group.groupType],
      fields: this.fb.array([])
    });
  }

  createFieldGroupFromFiled(field: TField) {
    return this.fb.group({
      name: [field.name],
      label: [field.label],
      type: [field.type]
    });
  }

  createFormGroup(type: FormGroupTypes): FormGroup {
    return this.fb.group({
      groupName: [],
      groupType: [type],
      fields: this.fb.array([])
    });
  }

  createFieldGroup(type: FormFieldTypes) {
    return this.fb.group({
      name: [],
      label: [],
      type: [type]
    });
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

// creteDyanmicFormStructureFromBuilderConfig({
//   config,
//   formGroups
// }: IDynamicFormConfig): DynamicFormState {
//   return {
//     config: {
//       formName: config.formName,
//       animations: config.animations ? config.animations : false,
//       paginateSections: config.pagination ? config.pagination : false,
//       structure: map(mapToFormGroup, formGroups),
//       formValidators: []
//     },
//     index: 0,
//     data: {},
//     errors: []
//   };
// }

// function mapToFormField(field: IFormBuilderField): TField {
//   return {
//     componentType: FormFieldTypes.Input, // TODO -> Dynamic
//     name: field.fieldName,
//     type: 'text',
//     label: field.fieldLabel
//   };
// }

// function mapToFormGroup(group: IFormBuilderGroup): IFormGroup {
//   return {
//     formGroup: group.groupName,
//     groupType: FormGroupTypes.Group,
//     fields: map(mapToFormField, group.fields)
//   };
// }
