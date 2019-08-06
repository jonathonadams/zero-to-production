import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'ngw-ui-form-errors',
  templateUrl: './ui-form-errors.component.html',
  styleUrls: ['./ui-form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiFormErrorsComponent {
  @Input() errors: { [key: string]: ValidationErrors }[] | undefined;
}
