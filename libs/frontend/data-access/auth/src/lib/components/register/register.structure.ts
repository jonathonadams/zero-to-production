import { Validators } from '@angular/forms';
import {
  FormFieldTypes,
  TFormGroups,
  IFormGroup
} from '@ngw/frontend/data-access/dynamic-form';
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
  name: 'themeSettings',
  fields: [
    {
      component: FormFieldTypes.Toggle,
      name: 'darkMode',
      label: 'Dark Mode',
      initialValue: false,
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'color',
      name: 'lightPrimary',
      label: 'Light Mode - Primary Colour',
      initialValue: '#000',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'color',
      name: 'lightAccent',
      label: 'Light Mode - Accent Colour',
      initialValue: '#000',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'color',
      name: 'darkPrimary',
      label: 'Dark Mode - Primary Colour',
      initialValue: '#000',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'color',
      name: 'darkAccent',
      label: 'Dark Mode - Primary Colour',
      initialValue: '#000',
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
      name: 'givenName',
      label: 'Given Name',
      autocomplete: 'given-name',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'text',
      name: 'surname',
      label: 'Surname',
      autocomplete: 'family-name',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'email',
      name: 'email',
      label: 'Email',
      autocomplete: 'email',
      validators: [Validators.required]
    },
    {
      component: FormFieldTypes.Input,
      type: 'date',
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
