import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from './dynamic-form.actions';
import { IDynamicFormConfig } from '../dynamic-form.interface';
import { filter, map } from 'rxjs/operators';
import { PrivateDynamicFormFacade } from './private-dynamic-form.facade';

@Injectable({ providedIn: 'root' })
export class DynamicFormFacade {
  constructor(
    private store: Store<any>,
    private facade: PrivateDynamicFormFacade
  ) {}

  formSubmits$(formName: string): Observable<any> {
    return this.facade.submit$.pipe(
      map(submits => submits[formName]),
      filter(submit => submit !== undefined)
    );
  }

  createFormIfNotExist(formName: string) {
    this.store.dispatch(fromActions.createForm({ formName }));
  }

  setFormConfig(formName: string, config: Partial<IDynamicFormConfig>) {
    this.store.dispatch(fromActions.setFormConfig({ formName, config }));
  }

  triggerFormSubmit(formName: string) {
    this.facade.triggerSubmit.next(formName);
  }

  /**
   * The set data method does not update the store, it resets the form with the data
   *
   * When the form resets, it will emit a value changed event and subsequently will update the store
   */
  setData(formName: string, data: any) {
    this.facade.setDataSubject.next({ [formName]: data });
  }

  nextSection(formName: string) {
    this.store.dispatch(fromActions.nextIndex({ formName }));
  }

  backASection(formName: string) {
    this.store.dispatch(fromActions.backIndex({ formName }));
  }

  resetFormSate(formName: string) {
    this.store.dispatch(fromActions.resetFormState({ formName }));
  }
}
