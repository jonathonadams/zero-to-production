import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FormBuilderActions from './form-builder.actions';
import { FormBuilderService } from '../form-builder.service';

@Injectable()
export class FormBuilderEffects {
  constructor(
    private actions$: Actions,
    private formService: FormBuilderService
  ) {}

  loadForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormBuilderActions.loadForms),
      exhaustMap(action =>
        this.formService.getAllForms().pipe(
          map(forms => FormBuilderActions.loadFormsSuccess({ forms })),
          catchError((error: HttpErrorResponse) =>
            of(FormBuilderActions.loadFormsFail({ error: error.message }))
          )
        )
      )
    )
  );

  createForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormBuilderActions.createForm),
      mergeMap(({ form: newForm }) =>
        this.formService.createForm(newForm).pipe(
          map(form => FormBuilderActions.createFormSuccess({ form })),
          catchError((error: HttpErrorResponse) =>
            of(FormBuilderActions.createFormFail({ error: error.message }))
          )
        )
      )
    )
  );

  updateForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormBuilderActions.updateForm),
      mergeMap(({ form }) =>
        this.formService.updateForm(form).pipe(
          map(form =>
            FormBuilderActions.updateFormSuccess({
              form: { id: form.formName, changes: form }
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(FormBuilderActions.updateFormFail({ error: error.message }))
          )
        )
      )
    )
  );

  deleteForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormBuilderActions.deleteForm),
      mergeMap(({ form }) =>
        this.formService.deleteForm(form.formName).pipe(
          map(name => FormBuilderActions.deleteFormSuccess({ formName: name })),
          catchError((error: HttpErrorResponse) =>
            of(FormBuilderActions.deleteFormFail({ error: error.message }))
          )
        )
      )
    )
  );
}
