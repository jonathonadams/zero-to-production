import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  DynamicFormFacade,
  TFormGroups,
  FormGroupTypes,
  FormFieldTypes
} from '@uqt/data-access/dynamic-form';
import { AuthFacade, ILoginCredentials } from '@uqt/data-access/auth';

const STRUCTURE: TFormGroups = [
  {
    formGroup: 'credentials',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        componentType: FormFieldTypes.Input,
        type: 'text',
        name: 'username',
        label: 'Username',
        autocomplete: 'username',
        validators: [Validators.required]
      },
      {
        componentType: FormFieldTypes.Input,
        type: 'password',
        name: 'password',
        label: 'Password',
        autocomplete: 'current-password',
        validators: [Validators.required]
      }
    ]
  }
];

@Component({
  selector: 'uqt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly formName = 'login';

  private subscription: Subscription;
  constructor(
    private formFacade: DynamicFormFacade,
    private facade: AuthFacade
  ) {
    this.formFacade.createFormIfNotExist(this.formName);

    this.subscription = this.formFacade
      .formSubmits$(this.formName)
      .subscribe(({ credentials }: { credentials: ILoginCredentials }) => {
        this.facade.login(credentials);
      });
  }

  ngOnInit() {
    // We do not want form group animations for the login page.
    this.formFacade.setFormConfig(this.formName, { animations: false });
    this.formFacade.setStructure(this.formName, STRUCTURE);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
