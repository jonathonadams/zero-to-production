import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { IRegistrationDetails } from '@ngw/shared/interfaces';
import { DynamicFormFacade } from '@ngw/frontend/data-access/dynamic-form';
import { RouterFacade } from '@ngw/frontend/data-access/router';
import { AuthFacade } from '../../+state/auth.facade';
import { REGISTER_STRUCTURE } from './register.structure';
import { Observable, Subscription } from 'rxjs';
import { AvailableStatus } from '../../+state/auth.reducer';
import { passwordMatchValidator } from '../../services/auth.validators';

interface IRegistrationFormStructure {
  details: {
    givenName: string;
    surname: string;
    email: string;
    dateOfBirth: Date;
  };
  themeSettings: {
    darkMode: boolean;
    lightPrimary: string;
    lightAccent: string;
    darkPrimary: string;
    darkAccent: string;
  };
  password: {
    username: string;
    password: string;
    passwordCheck: string;
  };
}

@Component({
  selector: 'ngw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  availability$: Observable<AvailableStatus | null>;
  private subscription: Subscription;

  constructor(
    private facade: AuthFacade,
    private formFacade: DynamicFormFacade,
    private router: RouterFacade
  ) {
    this.availability$ = this.facade.usernameAvailability$;

    this.subscription = this.formFacade.submit$.subscribe(
      (details: IRegistrationFormStructure) => {
        this.register(details);
      }
    );
  }

  ngOnInit() {
    const passwordCheck = passwordMatchValidator(
      'password',
      'password',
      'passwordCheck'
    );
    // we do want animations for the register form
    this.formFacade.setFormConfig({ animations: true });
    this.formFacade.setFormValidators([passwordCheck]);
    this.formFacade.setStructure({ structure: REGISTER_STRUCTURE });
  }

  register(details: IRegistrationFormStructure): void {
    // pop the darkMode off from the collection
    const { darkMode, ...colors } = details.themeSettings;

    const settings: IRegistrationDetails = {
      username: details.password.username,
      ...details.details,
      settings: {
        darkMode,
        colors
      },
      password: details.password.password
    };

    this.facade.register(settings);
  }

  cancel() {
    this.formFacade.setData({ data: {} });
    this.router.go({ path: ['login'] });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.facade.clearAvailable();
    this.formFacade.resetFormValidators();
  }
}
