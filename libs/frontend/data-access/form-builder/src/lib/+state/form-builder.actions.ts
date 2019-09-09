import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IForm } from '../form-builder.model';

export const selectForm = createAction(
  '[Form/Builder] Select',
  props<{ id: string }>()
);

export const clearSelected = createAction('[Form/Builder] Clear');

export const loadForms = createAction('[Form/Builder] Load Forms');

export const loadFormsSuccess = createAction(
  '[Form/Builder] Load Success',
  props<{ forms: IForm[] }>()
);

export const loadFormsFail = createAction(
  '[Form/Builder] Load Fail',
  props<{ error: string }>()
);

export const createForm = createAction(
  '[Form/Builder] Create ',
  props<{ form: IForm }>()
);
export const createFormSuccess = createAction(
  '[Form/Builder] Create Success',
  props<{ form: IForm }>()
);

export const createFormFail = createAction(
  '[Form/Builder] Create Fail',
  props<{ error: string }>()
);

export const updateForm = createAction(
  '[Form/Builder] Update ',
  props<{ form: IForm }>()
);
export const updateFormSuccess = createAction(
  '[Form/Builder] Update Success',
  props<{ form: Update<IForm> }>()
);

export const updateFormFail = createAction(
  '[Form/Builder] Update Fail',
  props<{ error: string }>()
);

export const deleteForm = createAction(
  '[Form/Builder] Delete',
  props<{ form: IForm }>()
);

export const deleteFormSuccess = createAction(
  '[Form/Builder] Delete Success',
  props<{ id: string }>()
);

export const deleteFormFail = createAction(
  '[Form/Builder] Delete Fail',
  props<{ error: string }>()
);
