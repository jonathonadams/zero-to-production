import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IDynamicFormConfig,
  generateInitialFormConfig
} from '@uqt/common/dynamic-form';

/**
 * Very Simple storage in local-storage
 *
 * TODO -> replace this service as a provider to save in DB?
 */
@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  private key = 'form-builders';

  public getAllForms(): Observable<IDynamicFormConfig[]> {
    const forms = localStorage.getItem(this.key);

    return of(forms ? (JSON.parse(forms) as IDynamicFormConfig[]) : []);
  }

  public createForm(
    form: Partial<IDynamicFormConfig>
  ): Observable<IDynamicFormConfig> {
    const formS = localStorage.getItem(this.key);
    const formConfig = generateInitialFormConfig(form);
    if (formS) {
      const forms = JSON.parse(formS) as IDynamicFormConfig[];
      forms.push(formConfig);

      localStorage.setItem(this.key, JSON.stringify(forms));
    } else {
      localStorage.setItem(this.key, JSON.stringify([formConfig]));
    }

    return of(formConfig);
  }

  public updateForm(form: IDynamicFormConfig): Observable<IDynamicFormConfig> {
    const formS = localStorage.getItem(this.key);

    if (formS) {
      const forms = JSON.parse(formS) as IDynamicFormConfig[];
      const newForms = forms.map(f =>
        f.formName === form.formName ? { ...f, ...form } : f
      );

      localStorage.setItem(this.key, JSON.stringify(newForms));
    }
    return of(form);
  }

  public deleteForm(formName: string): Observable<string> {
    const formS = localStorage.getItem(this.key);

    if (formS) {
      const forms = JSON.parse(formS) as IDynamicFormConfig[];
      const newForms = forms.filter(f => f.formName !== formName);

      localStorage.setItem(this.key, JSON.stringify(newForms));
    }

    return of(formName);
  }
}
