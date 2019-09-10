import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsFacade, IForm } from '@ngw/data-access/form-builder';

@Component({
  selector: 'ngw-example-form-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCreateFormComponent {
  form$: Observable<IForm[]>;

  constructor(private formsFacade: FormsFacade) {
    this.form$ = this.formsFacade.form$;
  }

  selected(form: IForm) {
    this.formsFacade.selectForm(form.id);
  }
}
