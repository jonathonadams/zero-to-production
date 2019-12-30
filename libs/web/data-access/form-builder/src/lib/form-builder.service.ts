import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFormBuilderStructure } from './form-builder.interface';

/**
 * Very Simple storage in local-storage
 * On creation, a sudo random id is created by Math.floor(Math.random() * 100)
 *
 * TODO -> replace this service as a provider to save in DB?
 */
@Injectable({ providedIn: 'root' })
export class FormBuilderService {
  private key = 'form-builders';

  public getAllForms(): Observable<IFormBuilderStructure[]> {
    const forms = localStorage.getItem(this.key);

    return of(forms ? (JSON.parse(forms) as IFormBuilderStructure[]) : []);
  }

  public createForm(
    form: IFormBuilderStructure
  ): Observable<IFormBuilderStructure> {
    const formId = Math.floor(Math.random() * 100).toString();
    const newForm: IFormBuilderStructure = { ...form, id: formId };

    const formS = localStorage.getItem(this.key);
    if (formS) {
      const forms = JSON.parse(formS) as IFormBuilderStructure[];
      forms.push(newForm);

      localStorage.setItem(this.key, JSON.stringify(forms));
    } else {
      localStorage.setItem(this.key, JSON.stringify([newForm]));
    }

    return of(newForm);
  }

  public updateForm(
    form: IFormBuilderStructure
  ): Observable<IFormBuilderStructure> {
    const formS = localStorage.getItem(this.key);

    if (formS) {
      const forms = JSON.parse(formS) as IFormBuilderStructure[];
      const newForms = forms.map(f =>
        f.id === form.id ? { ...f, ...form } : f
      );

      localStorage.setItem(this.key, JSON.stringify(newForms));
    }
    return of(form);
  }

  public deleteForm(id: string): Observable<string> {
    const formS = localStorage.getItem(this.key);

    if (formS) {
      const forms = JSON.parse(formS) as IFormBuilderStructure[];
      const newForms = forms.filter(f => f.id !== id);

      localStorage.setItem(this.key, JSON.stringify(newForms));
    }

    return of(id);
  }
}
