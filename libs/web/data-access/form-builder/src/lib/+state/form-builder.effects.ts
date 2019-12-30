import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DynamicFormFacade } from '@uqt/data-access/dynamic-form';
import * as FormActions from './form-builder.actions';
import { FormBuilderService } from '../form-builder.service';
import { FormBuilderConstructorService } from '../form-constructor.service';

@Injectable()
export class FormEffects {
  constructor(
    private actions$: Actions,
    private formService: FormBuilderService,
    private formConstructor: FormBuilderConstructorService,
    private dynamicFormFacade: DynamicFormFacade
  ) {}

  @Effect()
  loadForms$ = this.actions$.pipe(
    ofType(FormActions.loadForms),
    exhaustMap(action =>
      this.formService.getAllForms().pipe(
        map(forms => FormActions.loadFormsSuccess({ forms })),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.loadFormsFail({ error: error.message }))
        )
      )
    )
  );

  @Effect()
  createForm$ = this.actions$.pipe(
    ofType(FormActions.createForm),
    mergeMap(({ form: newForm }) =>
      this.formService.createForm(newForm).pipe(
        map(form => FormActions.createFormSuccess({ form })),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.createFormFail({ error: error.message }))
        )
      )
    )
  );

  @Effect()
  updateForm$ = this.actions$.pipe(
    ofType(FormActions.updateForm),
    mergeMap(({ form }) =>
      this.formService.updateForm(form).pipe(
        map(form =>
          FormActions.updateFormSuccess({
            form: { id: form.formName, changes: form }
          })
        ),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.updateFormFail({ error: error.message }))
        )
      )
    )
  );

  @Effect()
  deleteForm$ = this.actions$.pipe(
    ofType(FormActions.deleteForm),
    mergeMap(({ form }) =>
      this.formService.deleteForm(form.formName).pipe(
        map(name => FormActions.deleteFormSuccess({ formName: name })),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.deleteFormFail({ error: error.message }))
        )
      )
    )
  );
}
