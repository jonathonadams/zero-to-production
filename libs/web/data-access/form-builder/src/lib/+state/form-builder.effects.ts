import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import {
  catchError,
  map,
  exhaustMap,
  mergeMap,
  tap,
  switchMap,
  filter
} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DynamicFormFacade } from '@uqt/data-access/dynamic-form';
import * as FormActions from './form-builder.actions';
import { FormsService } from '../form-builder.service';
import { FormsConstructorService } from '../form-constructor.service';
import { FormBuilderFacade } from './form-builder.facade';
import { IFormBuilderStructure } from '../form-builder.models';

@Injectable()
export class FormEffects {
  constructor(
    private actions$: Actions,
    private facade: FormBuilderFacade,
    private formService: FormsService,
    private formConstructor: FormsConstructorService,
    private dynamicFormFacade: DynamicFormFacade
  ) {}

  @Effect()
  loadForms$ = this.actions$.pipe(
    ofType(FormActions.loadForms),
    exhaustMap(action =>
      this.formService.getAllForms().pipe(
        map(result => {
          if (result.errors) {
            return FormActions.loadFormsFail({
              error: result.errors[0].message
            });
          } else if (result.data) {
            return FormActions.loadFormsSuccess({
              forms: result.data.allForms
            });
          }
        }),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.loadFormsFail({ error: error.message }))
        )
      )
    )
  );

  @Effect()
  createForm$ = this.actions$.pipe(
    ofType(FormActions.createForm),
    mergeMap(({ form }) =>
      this.formService.createForm(form).pipe(
        map(result => {
          if (result.errors) {
            return FormActions.createFormFail({
              error: result.errors[0].message
            });
          } else if (result.data) {
            return FormActions.createFormSuccess({
              form: result.data.newForm
            });
          }
        }),
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
        map(result => {
          if (result.errors) {
            return FormActions.updateFormFail({
              error: result.errors[0].message
            });
          } else if (result.data) {
            return FormActions.updateFormSuccess({
              form: { id: form.id, changes: result.data.updateForm }
            });
          }
        }),

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
      this.formService.deleteForm(form.id).pipe(
        map(result => {
          if (result.errors) {
            return FormActions.deleteFormFail({
              error: result.errors[0].message
            });
          } else if (result.data) {
            return FormActions.deleteFormSuccess({ id: form.id });
          }
        }),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.deleteFormFail({ error: error.message }))
        )
      )
    )
  );

  @Effect({ dispatch: false })
  createFormFromConfig$ = this.actions$.pipe(
    ofType(FormActions.createFormFromBuilderConfig),
    switchMap(
      () => this.facade.selectedForm$ as Observable<IFormBuilderStructure>
    ),
    filter(config => config !== undefined),
    map(config =>
      this.formConstructor.creteDyanmicFormStructureFromBuilderConfig(config)
    ),
    tap(structure => this.dynamicFormFacade.setStructure({ structure }))
  );
}
