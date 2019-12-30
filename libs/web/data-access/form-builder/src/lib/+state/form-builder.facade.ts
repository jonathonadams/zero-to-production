import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllForms, selectCurrentForm } from './form-builder.selectors';
import * as FromActions from './form-builder.actions';
import { IDynamicFormConfig } from '@uqt/data-access/dynamic-form';

@Injectable({ providedIn: 'root' })
export class FormBuilderFacade {
  form$: Observable<IDynamicFormConfig[]>;
  selectedForm$: Observable<IDynamicFormConfig | undefined>;

  constructor(private store: Store<any>) {
    this.form$ = this.store.pipe(select(selectAllForms));
    this.selectedForm$ = this.store.pipe(select(selectCurrentForm));
  }

  loadForms(): void {
    this.store.dispatch(FromActions.loadForms());
  }

  selectForm(name: string): void {
    this.store.dispatch(FromActions.selectForm({ formName: name }));
  }

  clearSelected(): void {
    this.store.dispatch(FromActions.clearSelected());
  }

  createForm(form: Partial<IDynamicFormConfig>): void {
    this.store.dispatch(FromActions.createForm({ form }));
  }

  updateForm(form: IDynamicFormConfig): void {
    this.store.dispatch(FromActions.updateForm({ form }));
  }

  deleteForm(form: IDynamicFormConfig): void {
    this.store.dispatch(FromActions.deleteForm({ form }));
  }

  addFormGroup() {
    this.store.dispatch(FromActions.addFormGroup());
  }
}
