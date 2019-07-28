import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import * as fromActions from './dynamic-form.actions';
import * as fromSelectors from './dynamic-form.selectors';
import { IFormErrors, TFormGroups } from '../form.models';
import { IDynamicFormConfig } from './dynamic-form.reducer';

@Injectable()
export class DynamicFormFacade {
  config$: Observable<IDynamicFormConfig>;
  idx$: Observable<number>;
  data$: Observable<any>;
  structure$: Observable<TFormGroups>;
  errors$: Observable<IFormErrors>;
  touched$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.config$ = this.store.pipe(select(fromSelectors.selectFormConfig));
    this.idx$ = this.store.pipe(select(fromSelectors.selectFormIdx));
    this.data$ = this.store.pipe(select(fromSelectors.selectData));
    this.structure$ = this.store.pipe(select(fromSelectors.selectStructure));
    this.errors$ = this.store.pipe(select(fromSelectors.selectErrors));
    this.touched$ = this.store.pipe(select(fromSelectors.selectTouchedForm));
  }

  setStructure(data: { structure: TFormGroups }) {
    this.store.dispatch(fromActions.setFormStructure(data));
  }

  setData(data: { data: any }) {
    this.store.dispatch(fromActions.setFormData(data));
  }

  setErrors({ errors }: { errors: IFormErrors }) {
    this.store.dispatch(fromActions.setFormErrors({ errors }));
  }

  updateData(data: { data: any }) {
    this.store.dispatch(fromActions.updateFormData(data));
  }

  initializeForm() {
    this.store.dispatch(fromActions.initializeForm());
  }

  clearErrors() {
    this.store.dispatch(fromActions.clearFormErrors());
  }

  resetForm() {
    this.store.dispatch(fromActions.resetForm());
  }

  nextSection() {
    this.store.dispatch(fromActions.nextIdx());
  }

  backASection() {
    this.store.dispatch(fromActions.backIdx());
  }

  goToSection(section: number) {
    this.store.dispatch(fromActions.gotToIdx({ idx: section }));
  }

  resetIndex() {
    this.store.dispatch(fromActions.resetIdx());
  }

  setFormConfig(config: IDynamicFormConfig) {
    this.store.dispatch(fromActions.setFormConfig(config));
  }
  resetFormConfig() {
    this.store.dispatch(fromActions.resetFormConfig());
  }

  enableAnimations() {
    this.store.dispatch(fromActions.enableAnimations());
  }

  disableAnimations() {
    this.store.dispatch(fromActions.disableAnimations());
  }
}
