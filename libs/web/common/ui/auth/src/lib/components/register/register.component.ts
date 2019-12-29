import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { DynamicFormFacade } from '@uqt/data-access/dynamic-form';
import { REGISTER_STRUCTURE } from './register.structure';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from '../../validators/auth.validators';
import { AuthFacade } from '@uqt/data-access/auth';
import { IRegistrationDetails } from 'libs/web/data-access/auth/src/lib/auth.interface';

interface IRegistrationFormStructure {
  details: {
    givenName: string;
    surname: string;
    email: string;
    dateOfBirth: string;
  };
  password: {
    username: string;
    password: string;
    passwordCheck: string;
  };
}

@Component({
  selector: 'uqt-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  readonly formName = 'register';

  private subscription: Subscription;

  constructor(
    private facade: AuthFacade,
    private formFacade: DynamicFormFacade
  ) {
    this.formFacade.createFormIfNotExist(this.formName);

    this.subscription = this.formFacade
      .formSubmits$(this.formName)
      .subscribe((details: IRegistrationFormStructure) => {
        this.register(details);
      });
  }

  ngOnInit() {
    const passwordCheck = passwordMatchValidator(
      'password',
      'password',
      'passwordCheck'
    );
    // we do want animations for the register form
    this.formFacade.setFormConfig(this.formName, { animations: true });
    this.formFacade.setValidators(this.formName, [passwordCheck]);
    this.formFacade.setStructure(this.formName, REGISTER_STRUCTURE);
  }

  register(details: IRegistrationFormStructure): void {
    const settings: IRegistrationDetails = {
      username: details.password.username,
      password: details.password.password,
      ...details.details
    };

    this.facade.register(settings);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.facade.clearAvailable();
  }
}
