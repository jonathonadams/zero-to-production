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
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'password',
      name: 'passwordCheck',
      label: 'Verify Password',
      autocomplete: 'new-password',
      validators: [Validators.required]
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

      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'lightPrimary',
      label: 'Light Mode - Primary Colour',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'lightAccent',
      label: 'Light Mode - Accent Colour',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'darkPrimary',
      label: 'Dark Mode - Primary Colour',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'darkAccent',
      label: 'Dark Mode - Primary Colour',
      validators: [Validators.required]
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
      validators: [Validators.required],
      asyncValidators: [UsernameAvailableValidator]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'name',
      label: 'Name',
      autocomplete: 'name',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'emailAddress',
      label: 'Email',
      autocomplete: 'email',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'dateOfBirth',
      label: 'Date Of Birth',
      autocomplete: 'bday',
      validators: [Validators.required]
    }
  ]
};

export const REGISTER_STRUCTURE: TFormGroups = [
  DETAILS_GROUP,
  THEME_GROUP,
  PASSWORD_GROUP
];
