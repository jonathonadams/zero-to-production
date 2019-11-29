import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { IFormBuilderStructure } from './form-builder.models';

@Injectable({ providedIn: 'root' })
export class FormsService {
  public getAllForms(): Observable<
    FetchResult<{ allForms: IFormBuilderStructure[] }>
  > {
    return of({ data: { allForms: [] } });
  }

  public createForm(
    form: IFormBuilderStructure
  ): Observable<FetchResult<{ newForm: IFormBuilderStructure }>> {
    const formId = Math.floor(Math.random() * Math.floor(100)).toString();
    const newForm: IFormBuilderStructure = { ...form, id: formId };
    return of({ data: { newForm } });
  }

  public updateForm(
    form: IFormBuilderStructure
  ): Observable<FetchResult<{ updateForm: IFormBuilderStructure }>> {
    return of({ data: { updateForm: form } });
  }

  public deleteForm(
    id: string
  ): Observable<FetchResult<{ removeForm: { id: string } }>> {
    return of({ data: { removeForm: { id } } });
  }
}
