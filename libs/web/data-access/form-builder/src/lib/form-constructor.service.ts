import { Injectable } from '@angular/core';
import {
  IFormBuilderGroup,
  IFormGroup,
  IFormBuilderField,
  TField,
  IFormBuilderStructure,
  TFormGroups
} from '@ngw/types';
import { FormGroupTypes, FormFieldTypes } from '@ngw/enums';

import map from 'ramda/es/map';

@Injectable({ providedIn: 'root' })
export class FormsConstructorService {
  mapToFormField(field: IFormBuilderField): TField {
    return {
      componentType: FormFieldTypes.Input, // TODO -> Dynamic
      name: field.fieldName,
      type: 'text',
      label: field.fieldLabel
    };
  }

  mapToFormGroup(group: IFormBuilderGroup): IFormGroup {
    return {
      formGroup: group.groupName,
      groupType: FormGroupTypes.Group,
      fields: map(this.mapToFormField, group.fields)
    };
  }

  creteDyanmicFormStructureFromBuilderConfig(
    structure: IFormBuilderStructure
  ): TFormGroups {
    return map(this.mapToFormGroup, structure.formGroups);
  }
}
