import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormsFacade,
  IFormBuilderStructure
} from '@ngw/data-access/form-builder';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { RouterFacade } from '@ngw/frontend/data-access/router';

@Component({
  selector: 'ngw-example-form-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleBuildFormComponent {
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  constructor(private facade: FormsFacade, private router: RouterFacade) {
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
