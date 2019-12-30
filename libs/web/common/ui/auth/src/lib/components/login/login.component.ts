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
    groupName: 'credentials',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        type: FormFieldTypes.Input,
        inputType: 'text',
        name: 'username',
        label: 'Username',
        autocomplete: 'username',
        validators: [Validators.required]
      },
      {
        type: FormFieldTypes.Input,
        inputType: 'password',
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
    this.formFacade.setFormConfig(this.formName, {
      animations: false,
      structure: STRUCTURE
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
