import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import {
  FormBuilderFacade,
  IFormBuilderStructure
} from '@uqt/data-access/form-builder';
import { Router } from '@angular/router';

@Component({
  selector: 'uqt-example-form-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleBuildFormComponent {
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  constructor(private facade: FormBuilderFacade, private router: Router) {
    this.selectedForm$ = this.facade.selectedForm$;
  }

  showForm() {
    (this.selectedForm$ as Observable<IFormBuilderStructure>)
      .pipe(
        filter(form => form !== undefined),
        take(1)
      )
      .subscribe(form => {
        this.router.navigate(['examples', 'form-builder', form.id, 'display']);
      });
  }
}
