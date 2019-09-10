import { Injectable } from '@angular/core';
import {
  IFormBuilderStructure,
  IFormBuilderGroup,
  IFormBuilderField
} from './form-builder.model';
import {
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes,
  TFormGroup,
  TField
} from '@ngw/frontend/data-access/dynamic-form';

@Injectable({ providedIn: 'root' })
export class FormsConstructorService {
  // createFormGroupStructure(fields: TField[], number: number) {
  createFormGroupStructure(group: IFormBuilderGroup): TFormGroup {
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
