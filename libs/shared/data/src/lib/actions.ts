import { Action } from '@ngrx/store';

/**
 * Some state actions include a payload to update the new state.
 * Extend the Action type to include the payload.
 */
export interface ActionWithPayload<T> extends Action {
  readonly payload: T;
}
