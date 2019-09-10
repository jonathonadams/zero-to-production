import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllForms, selectCurrentForm } from './form-builder.selectors';
import * as FormActions from './form-builder.actions';
import { IForm } from '../form-builder.model';

@Injectable({ providedIn: 'root' })
export class FormsFacade {
  form$: Observable<IForm[]>;
  selectedForm$: Observable<IForm | undefined>;

  constructor(private store: Store<any>) {
    this.form$ = this.store.pipe(select(selectAllForms));
    this.selectedForm$ = this.store.pipe(select(selectCurrentForm));
  }

  public loadForms(): void {
    this.store.dispatch(FormActions.loadForms());
  }

  public selectForm(id: string): void {
    this.store.dispatch(FormActions.selectForm({ id }));
  }

  public clearSelected(): void {
    this.store.dispatch(FormActions.clearSelected());
  }

  public saveForm(form: IForm): void {
    form.id ? this.updateForm(form) : this.createForm(form);
  }

  public createForm(form: IForm): void {
    this.store.dispatch(FormActions.createForm({ form }));
  }

  public updateForm(form: IForm): void {
    this.store.dispatch(FormActions.updateForm({ form }));
  }

  public deleteForm(form: IForm): void {
    this.store.dispatch(FormActions.deleteForm({ form }));
  }
}
