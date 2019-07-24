import { Validators } from '@angular/forms';
import {
  Field,
  FormFieldTypes
} from '@workspace/frontend/data-access/dynamic-form';
import { UsernameAvailableValidator } from '../services/username-available.validator';

export const REGISTER_STRUCTURE: Field[] = [
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
];
