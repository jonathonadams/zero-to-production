import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilderFacade } from '@uqt/data-access/form-builder';
import {
  DynamicFormFacade,
  IDynamicFormConfig
} from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-example-form-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDisplayFormComponent implements OnDestroy {
  form$: Observable<IDynamicFormConfig[]>;
  selectedForm$: Observable<IDynamicFormConfig | undefined>;
  subscription: Subscription;

  submit$: Observable<any>;

  constructor(
    private builderFacade: FormBuilderFacade,
    private formsFacade: DynamicFormFacade
  ) {
    this.selectedForm$ = this.builderFacade.selectedForm$;
    // this.formsFacade.createFormIfNotExist(this.formName);
    // this.submit$ = this.formsFacade.formSubmits$(this.formName);

    // this.subscription = (this.selectedForm$ as Observable<
    //   IDynamicFormConfig
    // >)
    //   .pipe(filter(config => config !== undefined))
    //   .subscribe(config => {
    //     this.builderFacade.createFormFromConfig(config);
    //   });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
