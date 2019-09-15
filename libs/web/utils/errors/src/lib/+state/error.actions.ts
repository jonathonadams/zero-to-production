import { createAction, props } from '@ngrx/store';

export const httpErrorAction = createAction(
  '[Error] HTTP',
  props<{ error: Error }>()
);
