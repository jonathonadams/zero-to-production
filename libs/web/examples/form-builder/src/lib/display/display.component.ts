import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  FormBuilderFacade,
  IFormBuilderStructure
} from '@uqt/data-access/form-builder';
import { DynamicFormFacade } from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-example-form-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDisplayFormComponent implements OnDestroy {
  form$: Observable<IFormBuilderStructure[]>;
  selectedForm$: Observable<IFormBuilderStructure | undefined>;
  subscription: Subscription;

  submit$: Observable<any>;

  constructor(
    private builderFacade: FormBuilderFacade,
    private formsFacade: DynamicFormFacade
  ) {
    this.form$ = this.builderFacade.form$;
    this.selectedForm$ = this.builderFacade.selectedForm$;
    this.submit$ = this.formsFacade.submit$;

    this.subscription = (this.selectedForm$ as Observable<
      IFormBuilderStructure
    >)
      .pipe(filter(config => config !== undefined))
      .subscribe(config => {
        this.builderFacade.createFormFromConfig(config);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
