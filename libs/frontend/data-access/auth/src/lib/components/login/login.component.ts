import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ILoginCredentials } from '@workspace/shared/interfaces';
import { Validators } from '@angular/forms';
import {
  DynamicFormFacade,
  FormFieldTypes,
  TFormGroups
} from '@workspace/frontend/data-access/dynamic-form';
import { RouterFacade } from '@workspace/frontend/data-access/router';
import { AuthFacade } from '../../+state/auth.facade';

const STRUCTURE: TFormGroups = [
  {
    name: 'credentials',
    fields: [
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
    ]
  }
];

@Component({
  selector: 'ngw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(
    private formFacade: DynamicFormFacade,
    private facade: AuthFacade,
    private router: RouterFacade
  ) {}

  ngOnInit() {
    this.formFacade.setStructure({ structure: STRUCTURE });
  }

  onSubmit({ credentials }: { credentials: ILoginCredentials }): void {
    this.facade.login(credentials);
  }

  registerUser() {
    this.router.go({ path: ['register'] });
  }
}