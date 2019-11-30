import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { RouterFacade } from '@uqt/data-access/router';
import {
  FormBuilderFacade,
  IFormBuilderStructure
} from '@uqt/data-access/form-builder';

@Component({
  selector: 'uqt-example-form-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleBuildFormComponent {
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  constructor(private facade: FormBuilderFacade, private router: RouterFacade) {
    this.selectedForm$ = this.facade.selectedForm$;
  }

  showForm() {
    (this.selectedForm$ as Observable<IFormBuilderStructure>)
      .pipe(
        filter(form => form !== undefined),
        take(1)
      )
      .subscribe(form => {
        this.router.go({
          path: ['examples', 'form-builder', form.id, 'display']
        });
      });
  }
}
