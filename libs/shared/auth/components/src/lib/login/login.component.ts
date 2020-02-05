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
  FormFieldTypes,
  InputFieldTypes
} from '@uqt/common/dynamic-form';
import { AuthFacade, ILoginCredentials } from '@uqt/shared/data-access/auth';

const STRUCTURE: TFormGroups = [
  {
    groupName: 'credentials',
    groupType: FormGroupTypes.Group,
    fields: [
      {
        type: FormFieldTypes.Input,
        name: 'username',
        label: 'Username',
        autocomplete: 'username',
        validators: [Validators.required]
      },
      {
        type: FormFieldTypes.Input,
        inputType: InputFieldTypes.Password,
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
