import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFormFacade } from '../+state/dynamic-form.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorsComponent {
  errors$: Observable<{ [key: string]: ValidationErrors }[]>;

  constructor(private facade: DynamicFormFacade) {
    // The form errors is an object, map to an array of key:value objects
    this.errors$ = this.facade.errors$.pipe(
      map(errors =>
        Object.keys(errors).map(key => {
          return { [key]: errors[key] };
        })
      )
    );
  }
}
