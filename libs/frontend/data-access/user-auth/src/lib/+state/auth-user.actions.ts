import { createAction, props } from '@ngrx/store';
import { User } from '@workspace/shared/data';
import { GraphQLError } from 'graphql';

export const selectAuthUser = createAction(
  '[User Auth/UI] Select',
  props<{ id: string }>()
);

export const clearAuthUser = createAction('[User Auth/UI] Clear');

export const loadAuthUser = createAction('[User Auth/API] Load');

export const loadAuthUserSuccess = createAction(
  '[User Auth/API] Load Success',
  props<{ user: User }>()
);

export const loadAuthUserFail = createAction(
  '[User Auth/API] Load Fail',
  props<{ error: GraphQLError | Error }>()
);
