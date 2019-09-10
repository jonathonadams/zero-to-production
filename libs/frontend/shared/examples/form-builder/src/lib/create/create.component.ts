import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormsFacade,
  IFormBuilderStructure
} from '@ngw/data-access/form-builder';
import { RouterFacade } from '@ngw/frontend/data-access/router';

@Component({
  selector: 'ngw-example-form-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleCreateFormComponent {
  form$: Observable<IFormBuilderStructure[]>;

  constructor(
    private formsFacade: FormsFacade,
    private routerFacade: RouterFacade
  ) {
    this.form$ = this.formsFacade.form$;
  }

  selected(form: IFormBuilderStructure, route: string) {
    this.formsFacade.selectForm(form.id);
    this.routerFacade.go({
      path: ['examples', 'form-builder', form.id, route]
    });
  }

  build(form: IFormBuilderStructure) {
    this.selected(form, 'build');
  }
  display(form: IFormBuilderStructure) {
    this.selected(form, 'display');
  }

  trackForms(i: number, f: IFormBuilderStructure) {
    return f.id;
  }
}
