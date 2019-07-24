import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IRegistrationDetails } from '@workspace/shared/interfaces';
import { DynamicFormFacade } from '@workspace/frontend/data-access/dynamic-form';
import { RouterFacade } from '@workspace/frontend/data-access/router';
import { AuthFacade } from '../+state/auth.facade';
import { REGISTER_STRUCTURE } from './register.form.strcuture';
import { Observable } from 'rxjs';
import { AvailableStatus } from '../+state/auth.reducer';

@Component({
  selector: 'ngw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
  availability$: Observable<AvailableStatus | null>;

  constructor(
    private formFacade: DynamicFormFacade,
    private facade: AuthFacade,
    private router: RouterFacade
  ) {
    this.availability$ = this.facade.usernameAvailability$;
  }

  ngOnInit() {
    this.formFacade.setStructure({ structure: REGISTER_STRUCTURE });
  }

  onSubmit(details: IRegistrationDetails): void {
    this.facade.register(details);
  }
}
