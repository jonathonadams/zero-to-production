import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { timer, Observable, Subject } from 'rxjs';
import { formErrorsAnimations } from './form-errors.animations';
import { IFormErrors } from '@ngw/types';
import { takeUntil } from 'rxjs/operators';

// TODO a11y Announcer

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [formErrorsAnimations]
})
export class FormErrorsComponent implements OnDestroy {
  private autoClose = 5000; // ms until close
  private unsubscribe = new Subject();

  @Output() dismiss = new EventEmitter<void>();

  totalErrors: number | undefined;
  errorsObject: { [key: string]: ValidationErrors }[] | undefined;

  constructor(private facade: DynamicFormFacade) {
    timer(this.autoClose)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.dismiss.emit();
      });

    (this.facade.errors$ as Observable<IFormErrors>)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(errors => {
        this.createErrorObject(errors);
      });
  }

  createErrorObject(errors: IFormErrors) {
    const errorKeys = Object.keys(errors);
    this.totalErrors = errorKeys.length;

    this.errorsObject = errorKeys.map(key => {
      return { [key]: errors[key] };
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
