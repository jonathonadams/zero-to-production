import { Validators } from '@angular/forms';
import {
  IFormGroup,
  FormGroupTypes,
  FormFieldTypes,
  TFormGroups
} from '@uqt/data-access/dynamic-form';
import { CustomUsernameComponent } from '../custom-username/custom-username.components';
import { UsernameAvailableValidator } from '../../validators/username-available.validator';
import { passwordValidator } from '../../validators/auth.validators';

const PASSWORD_GROUP: IFormGroup = {
  formGroup: 'password',
  groupType: FormGroupTypes.Group,
  fields: [
    {
      componentType: FormFieldTypes.Input,
      type: 'text',
      name: 'username',
      label: 'Username',
      autocomplete: 'username',
      validators: [Validators.required],
      asyncValidators: [UsernameAvailableValidator],
      customComponent: CustomUsernameComponent
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'password',
      name: 'password',
      label: 'Select Password',
      autocomplete: 'new-password',
      validators: [Validators.required, passwordValidator]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'password',
      name: 'passwordCheck',
      label: 'Verify Password',
      autocomplete: 'new-password',
      validators: [Validators.required]
    }
  ]
};

export const DETAILS_GROUP: IFormGroup = {
  formGroup: 'details',
  groupType: FormGroupTypes.Group,
  fields: [
    {
      componentType: FormFieldTypes.Input,
      type: 'text',
      name: 'givenName',
      label: 'Given Name',
      autocomplete: 'given-name',
      validators: [Validators.required]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'text',
      name: 'surname',
      label: 'Surname',
      autocomplete: 'family-name',
      validators: [Validators.required]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'email',
      name: 'email',
      label: 'Email',
      autocomplete: 'email',
      validators: [Validators.required, Validators.email]
    },
    {
      componentType: FormFieldTypes.DatePicker,
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      autocomplete: 'bday',
      validators: [Validators.required]
    }
  ]
};

export const REGISTER_STRUCTURE: TFormGroups = [DETAILS_GROUP, PASSWORD_GROUP];
