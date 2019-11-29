import { FormFieldTypes } from '@ngw/data-access/dynamic-form';

/**
 * The below is for the form builder
 */
export interface IFormBuilderStructure {
  id: string;
  config: {
    formName: string;
    animations?: boolean;
    pagination?: boolean;
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
