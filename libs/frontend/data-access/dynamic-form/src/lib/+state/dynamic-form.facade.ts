import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FormActions from './dynamic-form.actions';
import {
  selectData,
  selectStructure,
  selectErrors,
  selectTouchedForm
} from './dynamic-form.selectors';
import { Field, FormErrors } from '../form.models';

@Injectable()
export class DynamicFormFacade {
  data$: Observable<any>;
  structure$: Observable<Field[]>;
  errors$: Observable<FormErrors>;
  touched$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.data$ = this.store.select(selectData);
    this.structure$ = this.store.select(selectStructure);
    this.errors$ = this.store.select(selectErrors);
    this.touched$ = this.store.select(selectTouchedForm);
  }

  setStructure(data: { structure: Field[] }) {
    this.store.dispatch(FormActions.setFormStructure(data));
  }

  setData(data: { data: any }) {
    this.store.dispatch(FormActions.setFormData(data));
  }

  setErrors({ errors }: { errors: FormErrors }) {
    this.store.dispatch(FormActions.setFormErrors({ errors }));
  }

  updateData(data: { data: any }) {
    this.store.dispatch(FormActions.updateFormData(data));
  }

  initializeForm() {
    this.store.dispatch(FormActions.initializeForm());
  }

  clearErrors() {
    this.store.dispatch(FormActions.clearFormErrors());
  }

  resetForm() {
    this.store.dispatch(FormActions.resetForm());
  }
}
