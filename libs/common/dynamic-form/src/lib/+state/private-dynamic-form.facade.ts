import { Injectable } from '@angular/core';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap, filter, take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as DynamicFormActions from './dynamic-form.actions';
import * as fromDynamicForm from './dynamic-form.selectors';
import {
  TFormStructure,
  IDynamicFormConfig,
  DynamicFormState
} from '../dynamic-form.interface';

@Injectable({ providedIn: 'root' })
export class PrivateDynamicFormFacade {
  private submitSubject: Subject<{
    [key: string]: any | undefined;
  }> = new Subject();
  submit$ = this.submitSubject.asObservable();

  triggerSubmit = new Subject<string>();
  submitTriggers$ = this.triggerSubmit.asObservable();

  setDataSubject = new BehaviorSubject<{ [key: string]: any }>({});

  constructor(protected store: Store<any>) {}

  selectForm(formName: string): Observable<DynamicFormState | undefined> {
    return this.store.pipe(select(fromDynamicForm.selectForm(formName)));
  }

  selectConfig(formName: string): Observable<IDynamicFormConfig | undefined> {
    return this.store.pipe(select(fromDynamicForm.selectFormConfig(formName)));
  }

  selectStructure(formName: string): Observable<TFormStructure | undefined> {
    return this.store.pipe(
      select(fromDynamicForm.selectFormStructure(formName))
    );
  }

  selectErrors(formName: string): Observable<string[] | undefined> {
    return this.store.pipe(select(fromDynamicForm.selectFormErrors(formName)));
  }

  selectIndex(formName: string): Observable<number | undefined> {
    return this.store.pipe(select(fromDynamicForm.selectFormIndex(formName)));
  }

  selectValidators(formName: string): Observable<ValidatorFn[] | undefined> {
    return this.store.pipe(
      select(fromDynamicForm.selectFormValidators(formName))
    );
  }

  setData$(formName: string) {
    return this.setDataSubject.pipe(
      map(data => data[formName]),
      filter(data => data !== undefined)
    );
  }

  updateDataState(formName: string, data: any) {
    this.store.dispatch(
      DynamicFormActions.updateFormDataState({ formName, data })
    );
  }

  setErrors(formName: string, errors: ValidationErrors) {
    this.store.dispatch(DynamicFormActions.setFormErrors({ formName, errors }));
  }

  // This is only triggered from either a valid form submit within the form component
  // or after a remotely triggered submit and passes validation
  internalSubmit(formName: string, data: any) {
    this.submitSubject.next({ [formName]: data });
  }

  submitTriggers(formName: string) {
    return this.submitTriggers$.pipe(filter(fN => fN === formName));
  }

  clearErrors(formName: string) {
    this.store.dispatch(DynamicFormActions.clearFormErrors({ formName }));
  }

  onDestroy() {
    this.setDataSubject.complete();
    this.submitSubject.complete();
  }
}
