import { Injectable } from '@angular/core';
import map from 'ramda/es/map';
import {
  IFormGroup,
  TField,
  TFormGroups,
  FormFieldTypes,
  FormGroupTypes
} from '@uqt/data-access/dynamic-form';
import {
  IFormBuilderStructure,
  IFormBuilderField,
  IFormBuilderGroup
} from './+state/form-builder.reducer';

@Injectable({ providedIn: 'root' })
export class FormConstructorService {
  creteDyanmicFormStructureFromBuilderConfig(
    structure: IFormBuilderStructure
  ): TFormGroups {
    return map(mapToFormGroup, structure.formGroups);
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
