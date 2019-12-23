import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromActions from './dynamic-form.actions';
import * as fromSelectors from './dynamic-form.selectors';
import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { TFormGroups } from '../dynamic-form.interface';
import { IDynamicFormConfig } from './dynamic-form.reducer';
import { tap, filter, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PrivateDynamicFormFacade {
  private submitSubject: Subject<{
    [key: string]: any | undefined;
  }> = new Subject();
  submit$ = this.submitSubject.asObservable();

  private triggerSubmitSubject = new Subject<string>();
  submitTriggers$ = this.triggerSubmitSubject.asObservable();

  setDataSubject = new Subject<any>();
  setData$ = this.setDataSubject.asObservable();

  constructor(protected store: Store<any>) {}

  checkExistsAndThrow(formName: string) {
    return this.store
      .pipe(
        select(fromSelectors.selectForm(formName)),
        take(1),
        tap(form => {
          if (!form) {
            throw new Error(`${formName} form has not been initialized.`);
          }
        })
      )
      .subscribe(() => {});
  }

  selectConfig(formName: string): Observable<IDynamicFormConfig | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormConfig(formName)));
  }

  selectStructure(formName: string): Observable<TFormGroups | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormStructure(formName)));
  }

  selectErrors(formName: string): Observable<string[] | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormErrors(formName)));
  }

  selectIndex(formName: string): Observable<number | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormIndex(formName)));
  }

  selectValidators(formName: string): Observable<ValidatorFn[] | undefined> {
    return this.store.pipe(
      select(fromSelectors.selectFormValidators(formName))
    );
  }

  setErrors(formName: string, errors: ValidationErrors) {
    this.store.dispatch(fromActions.setFormErrors({ formName, errors }));
  }

  // This is only triggered from from either a valid form submit within the form component
  // or after a remotely triggered submit and passes validation
  internalSubmit(formName: string, data: any) {
    this.submitSubject.next({ [formName]: data });
  }

  triggerSubmit(formName: string) {
    this.triggerSubmitSubject.next(formName);
  }

  submitTriggers(formName: string) {
    return this.submitTriggers$.pipe(filter(fN => fN === formName));
  }

  clearErrors(formName: string) {
    this.store.dispatch(fromActions.clearFormErrors({ formName }));
  }

  onDestroy() {
    this.setDataSubject.complete();
    this.submitSubject.complete();
  }
}
