import { Type } from '@angular/core';
import { FormFieldTypes } from '../form.models';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { ToggleComponent } from './toggle/toggle.components';

export const componentMap: { [key: string]: Type<any> } = {
  [FormFieldTypes.Input]: InputComponent,
  [FormFieldTypes.Select]: SelectComponent,
  [FormFieldTypes.Toggle]: ToggleComponent
};
