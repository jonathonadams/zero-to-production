import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LoginCredentials } from '@workspace/shared/interfaces';
import { Validators } from '@angular/forms';
import { AuthFacade } from '../+state/auth.facade';
import {
  Field,
  DynamicFormFacade
} from '@workspace/frontend/data-access/dynamic-form';

const STRUCTURE: Field[] = [
  {
    component: 'INPUT',
    type: 'text',
    name: 'username',
    label: 'Username',
    autocomplete: 'username',
    initialValue: '',
    validators: [Validators.required],
    appearance: 'standard'
  },
  {
    component: 'INPUT',
    type: 'password',
    name: 'password',
    label: 'Password',
    autocomplete: 'password',
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

  public onSubmit(credentials: LoginCredentials): void {
    this.facade.login(credentials);
  }
}
