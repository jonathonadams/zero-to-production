import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { DynamicFormFacade } from '@uqt/common/dynamic-form';
import { REGISTER_STRUCTURE } from './register.structure';
import { Subscription } from 'rxjs';
import { passwordMatchValidator } from '../../validators/auth.validators';
import { AuthFacade, IRegistrationDetails } from '@uqt/shared/data-access/auth';

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
    this.formFacade.setFormConfig(this.formName, {
      animations: true,
      paginateSections: true,
      structure: REGISTER_STRUCTURE,
      formValidators: [passwordCheck]
    });
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
