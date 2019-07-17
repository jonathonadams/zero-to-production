import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ILoginCredentials } from '@workspace/shared/interfaces';
import { Validators } from '@angular/forms';
import { AuthFacade } from '../+state/auth.facade';
import {
  Field,
  DynamicFormFacade,
  FormFieldTypes
} from '@workspace/frontend/data-access/dynamic-form';

const STRUCTURE: Field[] = [
  {
    component: FormFieldTypes.Input,
    type: 'text',
    name: 'username',
    label: 'Username',
    autocomplete: 'username',
    initialValue: '',
    validators: [Validators.required],
    appearance: 'standard'
  },
  {
    component: FormFieldTypes.Input,
    type: 'password',
    name: 'password',
    label: 'Password',
    autocomplete: 'current-password',
    initialValue: '',
    validators: [Validators.required],
    appearance: 'standard'
  }
];

@Component({
  selector: 'ngw-common-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonLoginComponent implements OnInit {
  constructor(
    private formFacade: DynamicFormFacade,
    private facade: AuthFacade
  ) {}

  ngOnInit() {
    this.formFacade.setStructure({ structure: STRUCTURE });
  }

  public onSubmit(credentials: ILoginCredentials): void {
    this.facade.login(credentials);
  }
}
