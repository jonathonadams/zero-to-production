import { Validators } from '@angular/forms';
import {
  FormFieldTypes,
  TFormGroups,
  IFormGroup
} from '@workspace/frontend/data-access/dynamic-form';
import { UsernameAvailableValidator } from '../../services/username-available.validator';

const PASSWORD_GROUP: IFormGroup = {
  name: 'password',
  fields: [
    {
      component: FormFieldTypes.Input,
      type: 'password',
      name: 'password',
      label: 'Select Password',
      autocomplete: 'new-password',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'password',
      name: 'passwordCheck',
      label: 'Verify Password',
      autocomplete: 'new-password',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    }
  ]
};

export const THEME_GROUP: IFormGroup = {
  name: 'themSettings',
  fields: [
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'darkMode',
      label: 'Mode',
      autocomplete: 'off',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'lightPrimary',
      label: 'Light Mode - Primary Colour',
      autocomplete: 'off',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'lightAccent',
      label: 'Light Mode - Accent Colour',
      autocomplete: 'off',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'darkPrimary',
      label: 'Dark Mode - Primary Colour',
      autocomplete: 'off',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'darkAccent',
      label: 'Dark Mode - Primary Colour',
      autocomplete: 'off',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    }
  ]
};

export const DETAILS_GROUP: IFormGroup = {
  name: 'details',
  fields: [
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'username',
      label: 'Username',
      autocomplete: 'username',
      initialValue: '',
      validators: [Validators.required],
      asyncValidators: [UsernameAvailableValidator],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'name',
      label: 'Name',
      autocomplete: 'name',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'emailAddress',
      label: 'Email',
      autocomplete: 'email',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      autocomplete: 'bday',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'password',
      name: 'newPassword',
      label: 'Password',
      autocomplete: 'new-password',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    },
    {
      component: FormFieldTypes.Input,
      type: 'password',
      name: 'passwordCheck',
      label: 'Password Check',
      autocomplete: 'new-password',
      initialValue: '',
      validators: [Validators.required],
      appearance: 'standard'
    }
  ]
};

export const REGISTER_STRUCTURE: TFormGroups = [
  DETAILS_GROUP,
  THEME_GROUP,
  PASSWORD_GROUP
];
