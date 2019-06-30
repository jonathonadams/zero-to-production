import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as FormActions from './dynamic-form.actions';

@Injectable()
export class DynamicFormsEffects {
  @Effect()
  setData$ = this.actions.pipe(
    ofType(FormActions.setFormData, FormActions.updateFormData),
    map(action => FormActions.clearFormErrors())
  );

  constructor(private actions: Actions) {}
}
