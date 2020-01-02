import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilderFacade } from '@uqt/data-access/form-builder';
import {
  DynamicFormFacade,
  IDynamicFormConfig
} from '@uqt/data-access/dynamic-form';

@Component({
  selector: 'uqt-example-form-builder-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleFormBuilderDisplayComponent implements OnDestroy {
  selectedForm$: Observable<IDynamicFormConfig | undefined>;
  sub: Subscription;

  submit$: Observable<any>;

  constructor(
    private builderFacade: FormBuilderFacade,
    private formsFacade: DynamicFormFacade
  ) {
    this.selectedForm$ = this.builderFacade.selectedForm$;

    this.sub = this.selectedForm$.subscribe(form => {
      if (form) {
        this.formsFacade.createFormIfNotExist(form.formName);
        this.formsFacade.setFormConfig(form.formName, form);
        this.formsFacade.resetFormSate(form.formName);
        this.submit$ = this.formsFacade.formSubmits$(form.formName);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
