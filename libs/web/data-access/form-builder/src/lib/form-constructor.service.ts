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

@Injectable({ providedIn: 'root' })
export class FormsConstructorService {
  createFormGroupStructure(group: IFormBuilderGroup): IFormGroup {
    return {
      formGroup: group.groupName,
      groupType: FormGroupTypes.Group,
      fields: group.fields.map(field => this.createFormField(field))
    };
  }

  createFormField(field: IFormBuilderField): TField {
    return {
      componentType: FormFieldTypes.Input, // TODO -> Dynamic
      name: field.fieldName,
      type: 'text',
      label: field.fieldLabel
    };
  }

  creteDyanmicFormStructureFromBuilderConfig(
    structure: IFormBuilderStructure
  ): TFormGroups {
    const STRUCTURE = structure.formGroups.map(group =>
      this.createFormGroupStructure(group)
    );

    return STRUCTURE;
  }
}
