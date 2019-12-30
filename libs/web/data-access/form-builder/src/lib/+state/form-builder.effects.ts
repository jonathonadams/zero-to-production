import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
  catchError,
  map,
  exhaustMap,
  mergeMap,
  tap,
  filter
} from 'rxjs/operators';
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
            form: { id: form.id, changes: form }
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
      this.formService.deleteForm(form.id).pipe(
        map(id => FormActions.deleteFormSuccess({ id })),
        catchError((error: HttpErrorResponse) =>
          of(FormActions.deleteFormFail({ error: error.message }))
        )
      )
    )
  );

  // @Effect({ dispatch: false })
  // createFormFromConfig$ = this.actions$.pipe(
  //   ofType(FormActions.createFormFromBuilderConfig),
  //   // switchMap(
  //   //   () => this.facade.selectedForm$ as Observable<IFormBuilderStructure>
  //   // ),
  //   filter(config => config !== undefined),
  //   map(action => {
  //     return {
  //       config: action.config,
  //       structure: this.formConstructor.creteDyanmicFormStructureFromBuilderConfig(
  //         action.config
  //       )
  //     };
  //   }),
  //   tap(({ config }) =>
  //     this.dynamicFormFacade.createFormIfNotExist(config.config.formName)
  //   ),
  //   tap(({ config, structure }) =>
  //     this.dynamicFormFacade.setStructure(config.config.formName, structure)
  //   )
  // );
}
