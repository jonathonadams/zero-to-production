import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { IRegistrationDetails } from '@workspace/shared/interfaces';
import { DynamicFormFacade } from '@workspace/frontend/data-access/dynamic-form';
import { RouterFacade } from '@workspace/frontend/data-access/router';
import { AuthFacade } from '../../+state/auth.facade';
import { REGISTER_STRUCTURE } from './register.structure';
import { Observable } from 'rxjs';
import { AvailableStatus } from '../../+state/auth.reducer';

@Component({
  selector: 'ngw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {
  availability$: Observable<AvailableStatus | null>;

  constructor(
    private formFacade: DynamicFormFacade,
    private facade: AuthFacade,
    private router: RouterFacade
  ) {
    this.availability$ = this.facade.usernameAvailability$;
  }

  ngOnInit() {
    // we do want animations for the register form
    this.formFacade.enableAnimations();
    this.formFacade.setStructure({ structure: REGISTER_STRUCTURE });
  }

  onSubmit(details: IRegistrationDetails): void {
    console.log(details);
    // this.facade.register(details);
  }

  cancel() {
    this.formFacade.setData({ data: {} });
    this.router.go({ path: ['login'] });
  }

  ngOnDestroy() {
    this.facade.clearAvailable();
  }
}
