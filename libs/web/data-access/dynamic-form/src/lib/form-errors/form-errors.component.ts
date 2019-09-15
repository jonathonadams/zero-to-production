import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { Subscription, timer } from 'rxjs';
import { formErrorsAnimations } from './form-errors.animations';
import { IFormErrors } from '@ngw/types';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [formErrorsAnimations]
})
export class FormErrorsComponent implements OnDestroy {
  private autoClose = 5000; // ms until close
  private subscription: Subscription;

  totalErrors: number | undefined;
  errorObject: { [key: string]: ValidationErrors }[] | undefined;

  @Input()
  set errors(errors: IFormErrors) {
    const errorKeys = Object.keys(errors);
    this.totalErrors = errorKeys.length;

    this.errorObject = errorKeys.map(key => {
      return { [key]: errors[key] };
    });
  }

  constructor(private facade: DynamicFormFacade) {
    this.subscription = timer(this.autoClose).subscribe(() => {
      this.facade.clearErrors();
    });
  }

  dismiss() {
    this.facade.clearErrors();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
