import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as fromActions from './dynamic-form.actions';
import { DynamicFormErrorsService } from '../form-errors/form-errors.service';

@Injectable()
export class DynamicFormsEffects {
  setErrors$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.setFormErrors),
      map((action) => {
        return {
          errors: this.errorService.createFieldErrors(action.errors),
          formName: action.formName,
        };
      }),
      map(({ formName, errors }) =>
        fromActions.formErrorsComplete({ formName, errors })
      )
    )
  );

  clearErrors$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.updateFormDataState),
      map(({ formName }) => fromActions.clearFormErrors({ formName }))
    )
  );

  constructor(
    private actions: Actions,
    private errorService: DynamicFormErrorsService
  ) {}
}
