import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllForms, selectCurrentForm } from './form-builder.selectors';
import * as FromActions from './form-builder.actions';
import { IFormBuilderStructure } from './form-builder.reducer';

@Injectable({ providedIn: 'root' })
export class FormBuilderFacade {
  form$: Observable<IFormBuilderStructure[]>;
  selectedForm$: Observable<IFormBuilderStructure | undefined>;

  constructor(private store: Store<any>) {
    this.form$ = this.store.pipe(select(selectAllForms));
    this.selectedForm$ = this.store.pipe(select(selectCurrentForm));
  }

  loadForms(): void {
    this.store.dispatch(FromActions.loadForms());
  }

  selectForm(id: string): void {
    this.store.dispatch(FromActions.selectForm({ id }));
  }

  clearSelected(): void {
    this.store.dispatch(FromActions.clearSelected());
  }

  saveForm(form: IFormBuilderStructure): void {
    form.id ? this.updateForm(form) : this.createForm(form);
  }

  createForm(form: IFormBuilderStructure): void {
    this.store.dispatch(FromActions.createForm({ form }));
  }

  updateForm(form: IFormBuilderStructure): void {
    this.store.dispatch(FromActions.updateForm({ form }));
  }

  deleteForm(form: IFormBuilderStructure): void {
    this.store.dispatch(FromActions.deleteForm({ form }));
  }

  createFormFromConfig(config: IFormBuilderStructure) {
    this.store.dispatch(FromActions.createFormFromBuilderConfig({ config }));
  }

  addFormGroup() {
    this.store.dispatch(FromActions.addFormGroup());
  }
}
