import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromActions from './dynamic-form.actions';
import * as fromSelectors from './dynamic-form.selectors';
import { IFormErrors, TFormGroups } from '../form.models';
import { IDynamicFormConfig } from './dynamic-form.reducer';
import { ValidatorFn } from '@angular/forms';

@Injectable()
export class DynamicFormFacade {
  config$: Observable<IDynamicFormConfig>;
  idx$: Observable<number>;
  data$: Observable<any>;
  structure$: Observable<TFormGroups>;
  errors$: Observable<IFormErrors | null>;
  validators$: Observable<ValidatorFn[]>;
  submit$: Subject<any> = new Subject();

  constructor(private store: Store<any>) {
    this.config$ = this.store.pipe(select(fromSelectors.selectFormConfig));
    this.idx$ = this.store.pipe(select(fromSelectors.selectFormIndex));
    this.data$ = this.store.pipe(select(fromSelectors.selectData));
    this.structure$ = this.store.pipe(select(fromSelectors.selectStructure));
    this.validators$ = this.store.pipe(
      select(fromSelectors.selectFormValidators)
    );
    this.errors$ = this.store.pipe(select(fromSelectors.selectErrors));
  }

  setStructure(data: { structure: TFormGroups }) {
    this.store.dispatch(fromActions.setFormStructure(data));
  }

  setData(data: { data: any }) {
    this.store.dispatch(fromActions.setFormData(data));
  }

  updateData(data: { data: any }) {
    this.store.dispatch(fromActions.updateFormData(data));
  }

  clearData(): void {
    this.setData({ data: {} });
  }

  setErrors({ errors }: { errors: IFormErrors }) {
    this.store.dispatch(fromActions.setFormErrors({ errors }));
  }

  resetForm() {
    this.store.dispatch(fromActions.resetForm());
  }

  clearErrors() {
    this.store.dispatch(fromActions.clearFormErrors());
  }

  setFormValidators(validators: ValidatorFn[]) {
    this.store.dispatch(fromActions.setFormValidators({ validators }));
  }

  resetFormValidators() {
    this.store.dispatch(fromActions.resetFormValidators());
  }

  nextSection() {
    this.store.dispatch(fromActions.nextIndex());
  }

  backASection() {
    this.store.dispatch(fromActions.backIndex());
  }

  goToSection(index: number) {
    this.store.dispatch(fromActions.gotToIndex({ index }));
  }

  resetIndex() {
    this.store.dispatch(fromActions.resetIndex());
  }

  setFormConfig(config: IDynamicFormConfig) {
    this.store.dispatch(fromActions.setFormConfig({ config }));
  }

  resetFormConfig() {
    this.store.dispatch(fromActions.resetFormConfig());
  }

  submit() {
    this.store.dispatch(fromActions.submitForm());
  }

  formSubmits(data: any): void {
    this.submit$.next(data);
  }

  onDestroy() {
    this.submit$.complete();
  }
}
