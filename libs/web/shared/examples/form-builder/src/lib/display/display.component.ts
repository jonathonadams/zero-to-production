import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormsFacade } from '@ngw/data-access/form-builder';
import { IFormBuilderStructure } from '@ngw/types';

@Component({
  selector: 'ngw-example-form-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDisplayFormComponent implements OnDestroy {
  selectedForm$: Observable<IFormBuilderStructure | undefined>;
  subscription: Subscription;

  constructor(private formsFacade: FormsFacade) {
    this.selectedForm$ = this.formsFacade.selectedForm$;

    this.subscription = (this.selectedForm$ as Observable<
      IFormBuilderStructure
    >)
      .pipe(filter(config => config !== undefined))
      .subscribe(config => {
        this.formsFacade.createFormFromConfig(config);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
