import { createAction, props } from '@ngrx/store';

export interface RouterNavigate {
  path: any[];
  query?: object;
  relative?: boolean;
}

export const navigate = createAction(
  '[Router] Go',
  props<{ nav: RouterNavigate }>()
);

export const relativeNavigate = createAction(
  '[Router] Relative Go',
  props<{ nav: RouterNavigate }>()
);

export const absoluteNavigate = createAction(
  '[Router] Absolute Go',
  props<{ nav: RouterNavigate }>()
);

export const navigateForward = createAction('[Router] Forward');

export const navigateBack = createAction('[Router] Back');
