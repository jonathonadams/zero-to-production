import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ILoginCredentials } from '@ngw/shared/interfaces';
import { Validators } from '@angular/forms';
import {
  DynamicFormFacade,
  FormFieldTypes,
  TFormGroups
} from '@ngw/frontend/data-access/dynamic-form';
import { RouterFacade } from '@ngw/frontend/data-access/router';
import { AuthFacade } from '../../+state/auth.facade';
import { Subscription } from 'apollo-client/util/Observable';

const STRUCTURE: TFormGroups = [
  {
    name: 'credentials',
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
  selector: 'ngw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor(
    private formFacade: DynamicFormFacade,
    private facade: AuthFacade,
    private router: RouterFacade
  ) {
    this.subscription = this.formFacade.submit$.subscribe(
      ({ credentials }: { credentials: ILoginCredentials }) => {
        this.facade.login(credentials);
      }
    );
  }

  ngOnInit() {
    // We do not want form group animations for the login page.
    this.formFacade.disableAnimations();
    this.formFacade.setStructure({ structure: STRUCTURE });
  }

  registerUser() {
    this.router.go({ path: ['register'] });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
