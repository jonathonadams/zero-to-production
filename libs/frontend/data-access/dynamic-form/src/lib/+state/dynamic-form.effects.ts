import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap, exhaustMap, take } from 'rxjs/operators';
import * as fromActions from './dynamic-form.actions';
import { DynamicFormFacade } from './dynamic-form.facade';

@Injectable()
export class DynamicFormsEffects {
  submit$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(fromActions.submitForm),
        exhaustMap(() => this.facade.data$.pipe(take(1))),
        tap(data => this.facade.formSubmits(data))
      ),
    { dispatch: false }
  );

  setData$ = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.setFormData, fromActions.updateFormData),
      map(() => fromActions.clearFormErrors())
    )
  );

  constructor(private actions: Actions, private facade: DynamicFormFacade) {}
}
