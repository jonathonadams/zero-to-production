import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { IForm } from './form-builder.model';

@Injectable({ providedIn: 'root' })
export class FormsService {
  public getAllForms(): Observable<FetchResult<{ allForms: IForm[] }>> {
    return of({ data: { allForms: [] } });
  }

  public createForm(form: IForm): Observable<FetchResult<{ newForm: IForm }>> {
    const formId = Math.floor(Math.random() * Math.floor(100)).toString();
    const newForm: IForm = { ...form, id: formId };
    return of({ data: { newForm } });
  }

  public updateForm(
    form: IForm
  ): Observable<FetchResult<{ updateForm: IForm }>> {
    return of({ data: { updateForm: form } });
  }

  public deleteForm(
    id: string
  ): Observable<FetchResult<{ removeForm: { id: string } }>> {
    return of({ data: { removeForm: { id } } });
  }

  // ------------------------------------------
  // The below functions can be used if you would
  // like to use REST based API calls
  // ------------------------------------------

  // public getAllForms(): Observable<Form[]> {
  //   return this.api.get<Form[]>(`forms`);
  // }

  // public getOneForm(id: string): Observable<Form> {
  //   return this.api.get<Form>(`forms/${id}`);
  // }

  // public createForm(form: Form): Observable<Form> {
  //   // Set the user id of the current JWT id
  //   form.user = this.auth.getDecodedToken().sub;
  //   return this.api.post<Form>('forms', form);
  // }

  // public updateForm(form: Form): Observable<Form> {
  //   return this.api.put<Form>('forms', form);
  // }

  // public deleteForm(form: Form): Observable<Form> {
  //   return this.api.delete<Form>('forms', form.id);
  // }

  // public navigateTo(id: string = ''): void {
  //   this.router.navigate([`/forms/${id}`]);
  // }
}
