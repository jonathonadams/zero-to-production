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
export class DynamicFormFacade {
  private _submit: Subject<{ [key: string]: any | undefined }> = new Subject();
  private _submit$ = this._submit.asObservable();

  private _submitTriggers = new Subject<string>();
  submitTriggers$ = this._submitTriggers.asObservable();

  // setData$ = new Subject<any>();

  constructor(private store: Store<any>) {}

  formSubmits$(formName: string): Observable<any> {
    return this._submit$.pipe(
      map(submits => submits[formName]),
      filter(submit => submit !== undefined)
    );
  }

  createFormIfNotExist(formName: string) {
    this.store.dispatch(fromActions.createForm({ formName }));
  }

  _internalCheckExistsAndThrow(formName: string) {
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

  _selectConfig(formName: string): Observable<IDynamicFormConfig | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormConfig(formName)));
  }

  _selectStructure(formName: string): Observable<TFormGroups | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormStructure(formName)));
  }

  _selectErrors(formName: string): Observable<string[] | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormErrors(formName)));
  }

  _selectIndex(formName: string): Observable<number | undefined> {
    return this.store.pipe(select(fromSelectors.selectFormIndex(formName)));
  }

  _selectValidators(formName: string): Observable<ValidatorFn[] | undefined> {
    return this.store.pipe(
      select(fromSelectors.selectFormValidators(formName))
    );
  }

  setStructure(formName: string, structure: TFormGroups) {
    this.store.dispatch(fromActions.setFormStructure({ formName, structure }));
  }

  setFormConfig(formName: string, config: Partial<IDynamicFormConfig>) {
    this.store.dispatch(fromActions.setFormConfig({ formName, config }));
  }

  setValidators(formName: string, validators: ValidatorFn[]) {
    this.store.dispatch(
      fromActions.setFormValidators({ formName, validators })
    );
  }

  _setErrors(formName: string, errors: ValidationErrors) {
    this.store.dispatch(fromActions.setFormErrors({ formName, errors }));
  }

  updateData(formName: string, data: any) {
    this.store.dispatch(fromActions.updateFormData({ formName, data }));
  }

  triggerSubmit(formName: string) {
    this._submitTriggers.next(formName);
  }

  // This is only triggered from from either a valid form submit within the form component
  // or after a remotely triggered submit and passes validation
  _internalSubmit(formName: string, data: any) {
    this._submit.next({ [formName]: data });
  }

  _internalSubmitTriggers(formName: string) {
    return this._submitTriggers.pipe(filter(fN => fN === formName));
  }

  _internalClearErrors(formName: string) {
    this.store.dispatch(fromActions.clearFormErrors({ formName }));
  }

  // resetForm() {
  //   this.store.dispatch(fromActions.resetForm());
  // }

  // resetFormValidators() {
  //   this.store.dispatch(fromActions.resetFormValidators());
  // }

  // setData(data: any) {
  //   this.setData$.next(data);
  // }

  // clearData(): void {
  //   this.setData({ data: {} });
  // }

  // /**
  //  * The set data method does not update the store, it resets the form with the data
  //  *
  //  * When the form resets, it will emit a value changed event and subsequently will update the store
  //  * @param data
  //  */
  // setData(data: any) {
  //   this.setData$.next(data);
  // }

  // clearData(): void {
  //   this.setData({ data: {} });
  // }

  // updateData(data: { data: any }) {
  //   this.store.dispatch(fromActions.updateFormData(data));
  // }

  nextSection(formName: string) {
    this.store.dispatch(fromActions.nextIndex({ formName }));
  }

  backASection(formName: string) {
    this.store.dispatch(fromActions.backIndex({ formName }));
  }

  // goToSection(index: number) {
  //   this.store.dispatch(fromActions.gotToIndex({ index }));
  // }

  // resetIndex() {
  //   this.store.dispatch(fromActions.resetIndex());
  // }

  onDestroy() {
    // this.setData$.complete();
    this._submit.complete();
  }
}
