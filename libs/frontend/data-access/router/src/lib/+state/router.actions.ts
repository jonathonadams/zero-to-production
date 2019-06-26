import { createAction, props } from '@ngrx/store';

export interface RouterNavigate {
  path: any[];
  query?: object;
}

export const navigate = createAction('[Router] Go', props<RouterNavigate>());

export const navigateForward = createAction('[Router] Forward');

export const navigateBack = createAction('[Router] Back');
