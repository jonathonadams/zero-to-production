import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { IFormErrors } from '../form.models';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormErrorsComponent {
  errorObject: { [key: string]: ValidationErrors }[] | undefined;

  @Input()
  set errors(errors: IFormErrors) {
    this.errorObject = Object.keys(errors).map(key => {
      return { [key]: errors[key] };
    });
  }
}
