import { FormFieldTypes } from '@ngw/frontend/data-access/dynamic-form';

export interface IFormBuilderStructure {
  id: string;
  config: {
    formName: string;
    animations?: boolean;
  };
  formGroups: IFormBuilderGroup[];
}

export interface IFormBuilderGroup {
  groupName: string;
  fields: IFormBuilderField[];
}

export interface IFormBuilderField {
  fieldName: string;
  fieldLabel: string;
  fieldType: FormFieldTypes;
}
