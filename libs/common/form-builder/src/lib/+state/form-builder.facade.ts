import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { IDynamicFormConfig } from '@ztp/common/dynamic-form';
import * as fromFormBuilder from './form-builder.selectors';
import * as FormBuilderActions from './form-builder.actions';

@Injectable({ providedIn: 'root' })
export class FormBuilderFacade {
  form$: Observable<IDynamicFormConfig[]>;
  selectedForm$: Observable<IDynamicFormConfig | undefined>;

  constructor(private store: Store<any>) {
    this.form$ = this.store.pipe(select(fromFormBuilder.selectAllForms));
    this.selectedForm$ = this.store.pipe(
      select(fromFormBuilder.selectCurrentForm)
    );
  }

  loadForms(): void {
    this.store.dispatch(FormBuilderActions.loadForms());
  }

  selectForm(name: string): void {
    this.store.dispatch(FormBuilderActions.selectForm({ formName: name }));
  }

  clearSelected(): void {
    this.store.dispatch(FormBuilderActions.clearSelected());
  }

  createForm(form: Partial<IDynamicFormConfig>): void {
    this.store.dispatch(FormBuilderActions.createForm({ form }));
  }

  updateForm(form: IDynamicFormConfig): void {
    this.store.dispatch(FormBuilderActions.updateForm({ form }));
  }

  deleteForm(form: IDynamicFormConfig): void {
    this.store.dispatch(FormBuilderActions.deleteForm({ form }));
  }

  addFormGroup() {
    this.store.dispatch(FormBuilderActions.addFormGroup());
  }
}
