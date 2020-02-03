import { Validators } from '@angular/forms';
import {
  IFormGroup,
  FormGroupTypes,
  FormFieldTypes,
  TFormGroups,
  InputFieldTypes
} from '@uqt/common/dynamic-form';
import { UsernameAvailableValidator } from '../../validators/username-available.validator';
import { passwordValidator } from '../../validators/auth.validators';

const PASSWORD_GROUP: IFormGroup = {
  groupName: 'password',
  groupType: FormGroupTypes.Group,
  fields: [
    {
      type: 'USERNAME',
      name: 'username',
      label: 'Username',
      validators: [Validators.required],
      asyncValidators: [UsernameAvailableValidator]
    },
    {
      type: FormFieldTypes.Input,
      inputType: InputFieldTypes.Password,
      name: 'password',
      label: 'Select Password',
      autocomplete: 'new-password',
      validators: [Validators.required, passwordValidator]
    },
    {
      type: FormFieldTypes.Input,
      inputType: InputFieldTypes.Password,
      name: 'passwordCheck',
      label: 'Verify Password',
      autocomplete: 'new-password',
      validators: [Validators.required]
    }
  ]
};

export const DETAILS_GROUP: IFormGroup = {
  groupName: 'details',
  groupType: FormGroupTypes.Group,
  fields: [
    {
      type: FormFieldTypes.Input,
      name: 'givenName',
      label: 'Given Name',
      autocomplete: 'given-name',
      validators: [Validators.required]
    },
    {
      type: FormFieldTypes.Input,
      name: 'surname',
      label: 'Surname',
      autocomplete: 'family-name',
      validators: [Validators.required]
    },
    {
      type: FormFieldTypes.Input,
      inputType: InputFieldTypes.Email,
      name: 'email',
      label: 'Email',
      autocomplete: 'email',
      validators: [Validators.required, Validators.email]
    },
    {
      type: FormFieldTypes.DatePicker,
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      autocomplete: 'bday',
      validators: [Validators.required]
    }
  ]
};

export const REGISTER_STRUCTURE: TFormGroups = [DETAILS_GROUP, PASSWORD_GROUP];
