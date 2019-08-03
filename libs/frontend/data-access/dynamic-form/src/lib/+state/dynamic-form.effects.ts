import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as fromActions from './dynamic-form.actions';

@Injectable()
export class DynamicFormsEffects {
  @Effect()
  setData$ = this.actions.pipe(
    ofType(fromActions.setFormData, fromActions.updateFormData),
    map(action => fromActions.clearFormErrors())
  );

  constructor(private actions: Actions) {}
}
