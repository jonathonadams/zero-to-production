import { Injectable } from '@angular/core';
import {
  IFormGroup,
  TField,
  TFormGroups,
  FormFieldTypes,
  FormGroupTypes
} from '@ngw/data-access/dynamic-form';

import map from 'ramda/es/map';
import {
  IFormBuilderField,
  IFormBuilderGroup,
  IFormBuilderStructure
} from './form-builder.models';

@Injectable({ providedIn: 'root' })
export class FormsConstructorService {
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
