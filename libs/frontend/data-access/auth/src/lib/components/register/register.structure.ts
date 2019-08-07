import { Validators } from '@angular/forms';
import {
  FormFieldTypes,
  TFormGroups,
  IFormGroup
} from '@ngw/frontend/data-access/dynamic-form';
import { UsernameAvailableValidator } from '../../validators/username-available.validator';
import { CustomUsernameComponent } from '../custom-username/custom-username.components';
import { passwordValidator } from '../../validators/auth.validators';

const PASSWORD_GROUP: IFormGroup = {
  name: 'password',
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

// TODO -> Tie in the user registration settings to the theme service.
export const THEME_GROUP: IFormGroup = {
  name: 'themeSettings',
  fields: [
    {
      componentType: FormFieldTypes.Toggle,
      name: 'darkMode',
      label: 'Dark Mode',
      initialValue: false,
      validators: [Validators.required]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'color',
      name: 'lightPrimary',
      label: 'Light Mode - Primary Colour',
      initialValue: '#ff5722',
      validators: [Validators.required]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'color',
      name: 'lightAccent',
      label: 'Light Mode - Accent Colour',
      initialValue: '#009688',
      validators: [Validators.required]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'color',
      name: 'darkPrimary',
      label: 'Dark Mode - Primary Colour',
      initialValue: '#d53ccf',
      validators: [Validators.required]
    },
    {
      componentType: FormFieldTypes.Input,
      type: 'color',
      name: 'darkAccent',
      label: 'Dark Mode - Primary Colour',
      initialValue: '#6059bd',
      validators: [Validators.required]
    }
  ]
};

export const DETAILS_GROUP: IFormGroup = {
  name: 'details',
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

export const REGISTER_STRUCTURE: TFormGroups = [
  DETAILS_GROUP,
  THEME_GROUP,
  PASSWORD_GROUP
];
